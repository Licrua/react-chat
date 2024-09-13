import { useSelector } from 'react-redux';
import { selectAllUsers } from '@slices/channelsSlice';
import useLoginSubmit from 'hooks/useLoginSubmit';
import LoginForm from '@components/loginPage/LoginForm';
import LoginHeader from '@components/loginPage/LoginHeader';
import { Container } from 'react-bootstrap';
import styles from '@styles/Login.module.scss';
import LoginFooter from '@components/loginPage/LoginFooter';
import { motion } from 'framer-motion';

const Login = () => {
  const users = useSelector((state) => selectAllUsers(state));
  const { onSubmitLogic } = useLoginSubmit();
  const sortedUsers = users.map((item) => item.name);

  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className={styles.login_container}
    >
      <LoginHeader />
      <LoginForm onSubmitLogic={onSubmitLogic} sortedUsers={sortedUsers} />
      <LoginFooter />
    </Container>
  );
};

export default Login;
