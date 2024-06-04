// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './loginSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});

store.subscribe(() =>  {
  const state = store.getState();
  console.log('state subscribe', state);
})

export default store;
