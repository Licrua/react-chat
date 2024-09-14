import React from 'react';
import styles from '@styles/RemovePopUp.module.scss';
import { useTranslation } from 'react-i18next';

const RemovePopUpButtons = ({
  closeWindow,
  handleRemove,
  currentId,
  keyDownHandler,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.buttons}>
      <button
        type="button"
        tabIndex="0"
        onClick={closeWindow}
        aria-label="cancel_button"
        className={styles.cancel_button}
      >
        {t('cancel')}
      </button>
      <button
        type="button"
        tabIndex="0"
        onKeyDown={(e) => keyDownHandler(e, currentId)}
        onClick={(e) => handleRemove(e, currentId)}
        className={styles.delete_button}
      >
        {t('delete')}
      </button>
    </div>
  );
};

export default RemovePopUpButtons;
