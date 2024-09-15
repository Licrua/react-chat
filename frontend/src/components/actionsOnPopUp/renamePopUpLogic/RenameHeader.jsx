// Header.jsx
import React from 'react';
import { CloseButton } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styles from '@styles/RenamePopUp.module.scss';

const Header = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div>
      <CloseButton
        aria-label="Hide"
        className="position-absolute top-0 p-2 end-0"
        onClick={onClose}
      />
      <h4>{t('renameChannel')}</h4>
      <hr className={styles.line} />
    </div>
  );
};

export default Header;
