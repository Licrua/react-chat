import { setIsPopupToggle } from '@slices/popUpSlice';
import { useDispatch } from 'react-redux';
import styles from '@styles/AddPopUp.module.scss';
import { useTranslation } from 'react-i18next';
import { CloseButton } from 'react-bootstrap';

const AddPopUpHeader = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const closeDialog = () => {
    dispatch(setIsPopupToggle(false));
  };
  return (
    <>
      <h4>{t('addChannel')}?</h4>
      <hr className={styles.line} />
      <CloseButton
        className={styles.close_anchor}
        onClick={closeDialog}
        aria-label="Hide"
      />
    </>
  );
};
export default AddPopUpHeader;
