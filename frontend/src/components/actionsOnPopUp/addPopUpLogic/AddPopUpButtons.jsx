import styles from '@styles/AddPopUp.module.scss';

const { Button } = require('react-bootstrap');
const { useTranslation } = require('react-i18next');

const AddPopUpButtons = ({ closeDialog }) => {
  const { t } = useTranslation();
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
