// features/counter/counterSlice.js
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();
const channelsAdapter = createEntityAdapter();
const messagesAdapter = createEntityAdapter();

const  initialState = {
  users : usersAdapter.getInitialState(),
  channels: channelsAdapter.getInitialState(), 
  messages: messagesAdapter.getInitialState(),
}

const loginSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    addUser: usersAdapter.addOne,
    addUsers: usersAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    addMessage: channelsAdapter.addOne,
}
})

export const { addUser, addUsers, addChannel, addChannels, addMessage} =
  loginSlice.actions;
export default loginSlice.reducer;

// const initialState = {users:[], channels: [], messages: [], currentUser: []};

// const loginSlice = createSlice({
//   name: "authorization",
//   initialState,
//   reducers: {
//     addUserData: (state,{payload}) => {
//       console.log('payload', payload);
//       state.currentUser.push(payload)
//     },
//     addUsers: (state, {payload}) => {
//       state.users.push(payload);
//     },
//     addChannels: (state, {payload}) => {
//       state.channels.push(...payload)
//     },
//     addMessager: (state, {payload}) => {
//       state.messages.push(payload)
//     }
//   },
// });

