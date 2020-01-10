// const io = require('socket.io')(process.env.PORT    );
// //creates server at port 3000

// const users = {}

// io.on('connection', socket => {
//     // socket.emit('chat-message', 'Hello World');
//     socket.on('new-user', name => {
//         users[socket.id] = name;
//         socket.broadcast.emit('user-connected', name)
//     });
//     socket.on('send-chat-message', message => {
//         socket.broadcast.emit('chat-message', { message, name: users[socket.id]});
//         //broadcast.emit will all other users on the chat
//     });
//     socket.on('disconnect', () => {
//         socket.broadcast.emit('user-disconnected', users[socket.id]);
//         delete users[socket.id];
//     })
// })
// //event listener, on load website, it will call this function.
// //socket.emit 'chat-message' is event name, second arg is the data that is sent
// // io.on(event, function);


'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);