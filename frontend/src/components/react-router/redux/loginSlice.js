// features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {users:[], channels: [], messages: [], currentUser: []};

const loginSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    addUserData: (state,{payload}) => {
      console.log('payload', payload);
      state.currentUser.push(payload)
    },
    addUsers: (state, {payload}) => {
      state.users.push(payload);
    },
    addChannels: (state, {payload}) => {
      state.channels.push(...payload)
    },
    addMessager: (state, {payload}) => {
      state.messages.push(payload)
    }
  },
});

export const { addUsers, addChannels, addUserData, addMessager } = loginSlice.actions;
export default loginSlice.reducer;
