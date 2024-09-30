import { useTranslation } from 'react-i18next';
import styles from '@styles/Login.module.scss';
import { motion } from 'framer-motion';

const LoginHeader = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.header_container}>
        <motion.h1
          initial={{ width: 0, opacity: 0, y: -200 }}
          animate={{ width: '100%', opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className={` d-flex justify-content-center`}
        >
          {t('authorization')}
        </motion.h1>
      </div>
      <div className="hr-custom-line" />
    </>
  );
};

export default LoginHeader;
