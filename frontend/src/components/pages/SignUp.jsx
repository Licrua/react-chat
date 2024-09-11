import SignUpForm from '@components/SignUpPage/SignUpForm';
import useSignUpSubmit from 'hooks/useSignUpSubmit';
import SignUpContainer from '@components/SignUpPage/SignUpContainer';
import SignUpFooter from '@components/SignUpPage/SignUpFooter';

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
