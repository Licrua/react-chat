import io from "socket.io-client";

const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
  socket.on('removeChannel', (payload) => {
    console.log('removeChannel', payload); // { id: 6 };
  });
  socket.on('renameChannel', (payload) => {
    console.log('renameChannel',payload); // { id: 7, name: "new name channel", removable: true }
  });
}); 

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

export default socket;
