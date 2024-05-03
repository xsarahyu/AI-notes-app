# notesGPT 🤖📝

## 👋 Introduction
Welcome to the [**notesGPT**](https://ai-notes.up.railway.app/), a web application that allows users to create, view, and delete notes. It integrates with the OpenAI API to proofread and correct the grammar of entered notes. The app utilizes React for the client-side interface and Node.js with Express for the server-side functionality.

## ⭐ Features
- **Create Notes**: Users can enter their notes and add them to the application.
- **View Notes**: Existing notes are displayed in list format.
- **Delete Notes**: Users can remove unwanted notes from the application.
- **Grammar Correction**: Before saving notes, the application utilizes the OpenAI API to correct any grammatical errors in the content.

## 🚀 Getting Started
To run the app locally, follow these steps:
1. Clone the repository: `git clone https://github.com/xsarahyu/AI-notes-app.git`
2. Navigate to the server directory: `cd server`
3. Create an .env file with the following information:
    ```
    MONGO_URI={your link}
    OPENAI_API_KEY={your key}
    ```
4. Install server dependencies: `npm install`
5. Run the server: `node server` or `nodemon server`
6. Navigate to the client directory (in a new terminal): `cd client`
7. Install client dependencies: `npm install`
8. Run the client: `npm run dev`
9. The app is now live at http://localhost:5173!

## 🚅 Railway Deployment Instructions
I learned a lot about deploying a React Vite frontend + Node/Express backend (both contained in one repository) to Railway, so I'm writing down the steps here for future reference.

1. Push repo to GitHub.

**Deploy the backend/server first**
1. In Railway, start a new project and select "Deploy from GitHub repo." Follow the instructions to use the repo in question.
2. In "Variables," add your environment variables for the server (`MONGO_URI` and `OPENAI_API_KEY` in this case).
3. In "Settings," specify the Root Directory as `/server`.
4. Deploy!
5. Customize the link to your server. In this case, I chose https://ai-notes-server.up.railway.app.

**Deploy the frontend/client**
1. In the client-side code, update all API calls to use the link to your server. For example:
    ```
    const baseURL = 'https://ai-notes-server.up.railway.app' || 'https://localhost:5000'
    ```
    ```
    const response = await axios.get(`${baseURL}/api/notes`)
    ```
2. Run `npm run build`. You should see a new `dist` directory in the client folder.
3. In package.json, add the script `"start": "npx http-server ./dist"` to start a local HTTP server that serves the contents of the `./dist` directory.
4. Push these updates to GitHub.
5. In the same project as the server, select "Deploy from GitHub repo." Follow the instructions to use the repo in question.
6. In "Variables," add your environment variables for the client (not applicable in this case).
7. In "Settings," specify the Root Directory as `/client`.
8. Deploy!
9. Customize the link to your client. In this case, I chose https://ai-notes.up.railway.app.

Side note: The only .env in this project is in the server directory. In future projects, if you need an .env for both client and server, you can just have one .env at the root directory.