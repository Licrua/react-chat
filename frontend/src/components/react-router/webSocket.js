import io from "socket.io-client";



const socket = io();


const message = {
  body: "новое сообщение",
  channelId: 7,
  username: "admin"
};
// Обработка успешного подключения
socket.on("connect", () => {
  console.log("Socket.io connection established");
  socket.emit('newMessage', message)
});


// Обработка сообщений от сервера



export default socket;
