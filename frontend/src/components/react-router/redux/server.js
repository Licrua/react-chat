// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Добавить CORS middleware

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5001",
    methods: ["GET", "POST"]
  }
});

const obj = {id: 1, password: 'dadsa'}

io.on('connection', (socket) => {
  console.log('A user connected');

  // Пример события
  socket.on('message', (msg) => {
    console.log('Message received: ' + msg);
    // Отправка ответа клиенту
    socket.emit('response', 'Message received');
  });

  socket.emit('password', obj)

 

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
