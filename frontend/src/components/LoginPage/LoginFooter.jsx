import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from '@styles/Login.module.scss';

const LoginFooter = () => {
  const { t } = useTranslation();

  return (
    <>
      <hr />
      <div className={styles.link_container}>
        {t('account')}
        <Link className={styles.link_to_signup} to="/signUp">
          {t('signUp')}
        </Link>
      </div>
    </>
  );
};

export default LoginFooter;
