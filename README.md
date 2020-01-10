# Chat_App
Create HTML file and create some divs and a form for the text input and submit
Install some dependencies
-npm init -y
-npm i socket.io
    --The server/socket that our chat app will be run on
-npm i --save-dev nodemon
    --Will update our server everytime a change happens, only in dev and not production
-In package.json, add a script:
    "devStart": "nodemon server.js"
    This script will run the server.js file whenever you type in npm run devStart in console.