import { useTranslation } from 'react-i18next';
import styles from '@styles/Login.module.scss';

const LoginHeader = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.header_container}>
        <h1 className={` d-flex justify-content-center typewriter`}>
          {t('authorization')}
        </h1>
      </div>
      <hr />
    </>
  );
};

export default LoginHeader;
