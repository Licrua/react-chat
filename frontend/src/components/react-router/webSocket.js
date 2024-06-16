import io from "socket.io-client";

const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
  socket.on('removeChannel', (payload) => {
    console.log('removeChannel', payload); // { id: 6 };
  });
}); 

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

export default socket;
