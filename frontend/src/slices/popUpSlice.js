// src/slices/popupSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toggleId: null,
  removeToggler: false,
  renameToggler: false,
  currentId: null,
  isPopupToggle: false,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setToggleId(state, action) {
      state.toggleId =
        state.toggleId === action.payload ? null : action.payload;
    },
    setRemoveToggler(state, action) {
      state.removeToggler = action.payload;
    },
    setRenameToggler(state, action) {
      state.renameToggler = action.payload;
    },
    setCurrentId(state, action) {
      state.currentId = action.payload;
    },
    setIsPopupToggle(state, action) {
      state.isPopupToggle = action.payload;
    },
  },
});

export const {
  setToggleId,
  setRemoveToggler,
  setRenameToggler,
  setCurrentId,
  setIsPopupToggle,
} = popupSlice.actions;

export default popupSlice.reducer;
