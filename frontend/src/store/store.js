// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from '@slices/channelsSlice';
import popUpSlice from '@slices/popUpSlice';

const store = configureStore({
  reducer: {
    channels: channelsSlice,
    popUp: popUpSlice,
  },
});

store.subscribe(() => {
  const state = store.getState();
  console.log('state subscribe', state);
});

export default store;
