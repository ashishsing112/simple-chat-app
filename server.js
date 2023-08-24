const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/images', express.static(__dirname + '/images'));

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);  // Forward the entire message object
    });
    // socket.on('chat message', (msg) => {
    //     socket.broadcast.emit('chat message', msg);  // Sends the message to everyone except the sender
    // });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});