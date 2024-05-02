require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { OpenAI } = require('openai')

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB')
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error)
})

// Define Note schema
const noteSchema = new mongoose.Schema({
  content: String
})

const Note = mongoose.model('Note', noteSchema)

// OpenAI instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Correct grammar using OpenAI API
const correctGrammar = async (content) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You will be provided with statements, and your task is to convert them to standard English."
        },
        {
          "role": "user",
          "content": content
        }
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    })
    return response.data.choices[0].message.content.trim()
  } catch (error) {
    console.error('Error correcting grammar:', error)
    return content // Return original content if correction fails
  }
}

// Routes
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find()
    res.json(notes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.post('/api/notes', async (req, res) => {
  const originalContent = req.body.content

  // Correct grammar before saving note
  const correctedContent = await correctGrammar(originalContent)

  const note = new Note({
    content: correctedContent
  })

  try {
    const newNote = await note.save()
    res.status(201).json(newNote)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.delete('/api/notes/:id', async (req, res) => {
  const id = req.params.id

  try {
    await Note.deleteOne({ _id: id })
    res.status(200).json({ message: 'Note deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
