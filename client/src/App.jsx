import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const baseURL = 'https://ai-notes-server.up.railway.app' || 'https://localhost:5000'

function App() {
  const [notes, setNotes] = useState([])
  const [newNoteContent, setNewNoteContent] = useState('')

  useEffect(() => {
    fetchNotes() 
  }, [])

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/notes`)
      setNotes(response.data)
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  const handleInputChange = (event) => {
    setNewNoteContent(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post(`${baseURL}/api/notes`, {
        content: newNoteContent
      })
      setNotes([...notes, response.data])
      setNewNoteContent('')
    } catch (error) {
      console.error('Error adding note:', error)
    }
  }

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${baseURL}/api/notes/${_id}`)
      setNotes(notes.filter(note => note._id !== _id))
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  return (
    <>
      <h1>Notes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newNoteContent}
          onChange={handleInputChange}
          placeholder="Enter note"
        />
        <button type="submit">Add Note</button>
      </form>
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            {note.content}
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
