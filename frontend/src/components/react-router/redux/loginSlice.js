// features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [

];

const loginSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    addLogin: (state, payload) => {
        console.log('payload', payload);
        state.push(payload)
    } 
  },
});

export const { addLogin } = loginSlice.actions;
export default loginSlice.reducer;
