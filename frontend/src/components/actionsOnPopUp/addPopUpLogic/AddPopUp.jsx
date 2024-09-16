import React from 'react';
import { setIsPopupToggle } from '@slices/popUpSlice';
import { useDispatch } from 'react-redux';
import AddPopUpOverlay from './AddPopUpOverlay'; // Импортируйте ваш компонент
import AddPopUpForm from './AddPopUpForm';
import AddPopUpContainer from './AddPopUpContainer';
import AddPopUpHeader from './AddPopUpHeader';

const AddPopUp = () => {
  const dispatch = useDispatch();

  const closeDialog = () => {
    dispatch(setIsPopupToggle(false));
  };

  return (
    <>
      <AddPopUpOverlay onClick={closeDialog} />
      <AddPopUpContainer>
        <AddPopUpHeader />
        <AddPopUpForm />
      </AddPopUpContainer>
    </>
  );
};

export default AddPopUp;
