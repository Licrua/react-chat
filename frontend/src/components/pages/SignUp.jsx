import SignUpForm from '@components/signUpPage/SignUpForm';
import useSignUpSubmit from 'hooks/useSignUpSubmit';
import SignUpContainer from '@components/signUpPage/SignUpContainer';
import SignUpFooter from '@components/signUpPage/SignUpFooter';

const SignUp = () => {
  const { onSubmitLogic } = useSignUpSubmit();

  return (
    <SignUpContainer>
      <SignUpForm handleOnSubmit={onSubmitLogic} />
      <SignUpFooter />
    </SignUpContainer>
  );
};
export default SignUp;
