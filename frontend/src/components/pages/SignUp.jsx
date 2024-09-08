import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import Header from '@components/header/Header';
import styles from '@styles/css/SignUp.module.scss';
import SignUpForm from '@components/SignUpPage/SignUpForm';
import useSignUpSubmit from 'hooks/useSignUpSubmit';

const SignUp = () => {
  const { t } = useTranslation();
  const { onSubmitLogic } = useSignUpSubmit;
  const usernameRef = useRef();

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);
  return (
    <>
      <Header />
      <Container className={styles.container}>
        <h1 className="d-flex justify-content-center font-weight-bold p-2 font-cursive">
          {t('registration')}
        </h1>
        <SignUpForm handleOnSubmit={onSubmitLogic} usernameRef={usernameRef} />
      </Container>
    </>
  );
};
export default SignUp;
