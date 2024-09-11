import { useSelector } from 'react-redux';
import { selectAllUsers } from '@slices/channelsSlice';
import useLoginSubmit from 'hooks/useLoginSubmit';
import LoginForm from 'components/LoginPage/LoginForm';
import LoginHeader from 'components/LoginPage/LoginHeader';
import { Container } from 'react-bootstrap';
import styles from '@styles/Login.module.scss';
import LoginFooter from '@components/LoginPage/LoginFooter';
import Header from '@components/header/Header';

const Login = () => {
  const users = useSelector((state) => selectAllUsers(state));
  const { onSubmitLogic } = useLoginSubmit();
  const sortedUsers = users.map((item) => item.name);

  return (
    <>
      <Header />
      <Container className={styles.login_container}>
        <LoginHeader />
        <LoginForm onSubmitLogic={onSubmitLogic} sortedUsers={sortedUsers} />
        <LoginFooter />
      </Container>
    </>
  );
};

export default Login;
