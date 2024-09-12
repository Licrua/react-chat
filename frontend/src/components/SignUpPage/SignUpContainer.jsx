import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styles from '@styles/SignUp.module.scss';
import { motion } from 'framer-motion';

const SignUpContainer = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className={styles.container}
    >
      <motion.h1
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '100%', opacity: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        className="d-flex justify-content-center font-weight-bold p-2 font-cursive "
      >
        {t('registration')}
      </motion.h1>
      <hr />
      <div>{children}</div>
    </Container>
  );
};

export default SignUpContainer;
