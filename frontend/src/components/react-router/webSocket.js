import io from "socket.io-client";



const socket = io("http://localhost:3000");

// Обработка успешного подключения
socket.on("connect", () => {
  console.log("Socket.io connection established");
  socket.emit('newMessage', 'строчка')
});

// Обработка сообщений от сервера



export default socket;
