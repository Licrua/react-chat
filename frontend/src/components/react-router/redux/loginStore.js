// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice';
import { usersAdapter } from './channelsSlice';
export const store = configureStore({
  reducer: {
    channels: channelsSlice,
  },
});

store.subscribe(() =>  {
  const state = store.getState();
  console.log('state subscribe', state);
})


export default store;
