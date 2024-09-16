import React from 'react';
import { useDispatch } from 'react-redux';
import { setRenameToggler } from '@slices/popUpSlice';
import RenameForm from './RenameForm';
import RenameHeader from './RenameHeader';
import RenameContainer from './RenameContainer';
import RenameOverlay from './RenamePopUpOverlay';

const RenamePopUp = () => {
  const dispatch = useDispatch();

  const closeWindow = () => {
    dispatch(setRenameToggler(false));
  };

  return (
    <div>
      <RenameOverlay />
      <RenameContainer>
        <RenameHeader onClose={closeWindow} />
        <RenameForm onClose={closeWindow} />
      </RenameContainer>
    </div>
  );
};

export default RenamePopUp;
