import SignUpForm from '@components/signUpPage/SignUpForm';
import useSignUpSubmit from 'hooks/useSignUpSubmit';
import SignUpContainer from '@components/signUpPage/SignUpContainer';
import SignUpFooter from '@components/signUpPage/SignUpFooter';

const SignUp = () => {
  return (
    <SignUpContainer>
      <SignUpForm />
      <SignUpFooter />
    </SignUpContainer>
  );
};
export default SignUp;
