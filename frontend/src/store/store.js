// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from '@slices/channelsSlice';
import messagesSlice from '@slices/messagesSlice';
import popUpSlice from '@slices/popUpSlice';
import usersSlice from '@slices/usersSlice';

const store = configureStore({
  reducer: {
    channels: channelsSlice,
    popUp: popUpSlice,
    users: usersSlice,
    messages: messagesSlice,
  },
});

store.subscribe(() => {
  const state = store.getState();
  console.log('state subscribe', state);
});

export default store;
