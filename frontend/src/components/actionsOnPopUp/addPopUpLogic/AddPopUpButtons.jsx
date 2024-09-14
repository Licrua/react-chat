import { setIsPopupToggle } from '@slices/popUpSlice';
import styles from '@styles/AddPopUp.module.scss';
import { useDispatch } from 'react-redux';

const { Button } = require('react-bootstrap');
const { useTranslation } = require('react-i18next');

const AddPopUpButtons = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const closeDialog = () => {
    dispatch(setIsPopupToggle(false));
  };
  return (
    <div className={styles.buttons}>
      <Button variant="danger" onClick={closeDialog} type="button">
        {t('cancel')}
      </Button>
      <Button variant="primary" type="submit">
        {t('create')}
      </Button>
    </div>
  );
};
export default AddPopUpButtons;
