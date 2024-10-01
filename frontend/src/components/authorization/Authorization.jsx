import { useLocation, Navigate } from 'react-router-dom';
import LoginForm from '@components/loginPage/LoginForm';
import SignUpForm from '@components/signUpPage/SignUpForm';
import GeneralContainer from './GeneralContainer';
import GeneralHeader from './GeneralHeader';
import GeneralFooter from './GeneralFooter';

const Authorization = () => {
  const location = useLocation();

  if (location.pathname === '/login') {
    return (
      <GeneralContainer>
        <GeneralHeader translation="loginFields.logIn" />
        <LoginForm />
        <GeneralFooter
          text="loginFields.account"
          transferLink="loginFields.goToSignUp"
          transferPage="signUp"
        />
      </GeneralContainer>
    );
  }
  if (location.pathname === '/signUp') {
    return (
      <GeneralContainer>
        <GeneralHeader translation="registration" />
        <SignUpForm />
        <GeneralFooter
          text="signUpFields.isRegistered"
          transferLink="signUpFields.goToLogin"
          transferPage="login"
        />
      </GeneralContainer>
    );
  }
  return <Navigate to="/404" />;
};

export default Authorization;
