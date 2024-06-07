import io from "socket.io-client";

const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
  socket.on('newMessage', (payload) => {
    console.log('payload', payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

export default socket;
