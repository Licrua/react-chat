import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import styles from '@styles/Login.module.scss';

const GeneralContainer = ({ children }) => {
  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className={styles.login_container}
    >
      {children}
    </Container>
  );
};
export default GeneralContainer;
