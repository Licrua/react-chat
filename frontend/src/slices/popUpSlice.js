// src/slices/popupSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toggleId: null,
  removeToggler: false,
  renameToggler: false,
  currentId: null,
  isPopupToggle: false,
  //   isPopupOpen: false,
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
    // setIsPopupOpen(state, action) {
    //   state.isPopupOpen = action.payload;
    // },
    setRenameToggler(state, action) {
      console.log('renameToggler');
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
  //   setIsPopupOpen,
} = popupSlice.actions;

export default popupSlice.reducer;
