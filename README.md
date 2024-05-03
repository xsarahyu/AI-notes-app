# AI-notes-app

## Railway Deployment Instructions
I learned a lot about deploying a React Vite frontend + Node backend (both contained in one repository) to Railway, so I'm writing down the steps for future reference.

1. Push repo to GitHub.

**Deploy the backend/server first**
1. In Railway, start a new project and select "Deploy from GitHub repo." Follow the instructions to use the repo in question.
2. In "Variables," add your environment variables for the server.
3. In "Settings," specify the Root Directory as `/server`
4. Deploy!
5. Customize the link to your server. In this case, I chose https://ai-notes-app-server.up.railway.app.

**Deploy the frontend/client**
1. In the client-side code, update all API calls to use the link to your server. For example:
    ```
    const baseURL = 'https://ai-notes-server.up.railway.app' || 'https://localhost:5000'
    ```
    ```
    const response = await axios.get(`${baseURL}/api/notes`)
    ```
2. Run `npm run build`. You should see a new `dist` directory in the client folder.
3. In package.json, add the script `"start": "npx http-server ./dist"`
4. Push these updates to GitHub.
5. In the same project as the server, select "Deploy from GitHub repo." Follow the instructions to use the repo in question.
6. In "Variables," add your environment variables for the client (not applicable in my case because I added the baseURL directly to App.jsx instead of an .env file).
7. In "Settings," specify the Root Directory as `/client`
8. Deploy!
9. Customize the link to your client. In this case, I chose https://ai-notes-server.up.railway.app.