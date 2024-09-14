import React from 'react';
import { CloseButton } from 'react-bootstrap';
import styles from '@styles/RemovePopUp.module.scss';
import { useTranslation } from 'react-i18next';

const RemovePopUpHeader = ({ closeWindow }) => {
  const { t } = useTranslation();

  return (
    <>
      <h4 className="mb-4">{t('delete')}</h4>
      <hr className={styles.line} />
      <p>{t('areYouSure')}</p>
      <CloseButton
        aria-label="Hide"
        className="position-absolute top-0 end-0"
        onClick={closeWindow}
      />
    </>
  );
};

export default RemovePopUpHeader;
