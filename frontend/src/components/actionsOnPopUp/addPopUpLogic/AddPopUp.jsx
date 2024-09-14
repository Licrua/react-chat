import React from 'react';
import { CloseButton } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styles from '@styles/AddPopUp.module.scss';
import { setIsPopupToggle } from '@slices/popUpSlice';
import { useDispatch } from 'react-redux';
import AddPopUpOverlay from './AddPopUpOverlay'; // Импортируйте ваш компонент
import AddPopUpForm from './AddPopUpForm';

const AddPopUp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const closeDialog = () => {
    dispatch(setIsPopupToggle(false));
  };

  return (
    <>
      <AddPopUpOverlay onClick={closeDialog} />
      <div className={styles.popUp_container} id="popup_window">
        <CloseButton
          className={styles.close_anchor}
          onClick={closeDialog}
          aria-label="Hide"
        />
        <h4>{t('addChannel')}?</h4>
        <hr className={styles.line} />
        <AddPopUpForm />
      </div>
    </>
  );
};

export default AddPopUp;
