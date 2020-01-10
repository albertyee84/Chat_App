const io = require('socket.io')(3000);
//creates server at port 3000

const users = {}

io.on('connection', socket => {
    // socket.emit('chat-message', 'Hello World');
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name)
    });
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message, name: users[socket.id]});
        //broadcast.emit will all other users on the chat
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    })
})
//event listener, on load website, it will call this function.
//socket.emit 'chat-message' is event name, second arg is the data that is sent
// io.on(event, function);

