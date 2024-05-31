// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './loginSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});

export default store;
