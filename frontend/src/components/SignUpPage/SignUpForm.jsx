import { Formik, Form } from 'formik';
import { Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useSignUpSubmit from 'hooks/useSignUpSubmit';
import { selectAllUsers } from '@slices/channelsSlice';
// import { useState, useEffect } from 'react';
import SignUpFields from './SignUpFields';
import SignUpImage from './SignUpImages';

const SignUpForm = () => {
  const { onSubmitLogic } = useSignUpSubmit();
  //   const [existedUsers, setExistedUsers] = useState([]);
  const users = useSelector((state) =>
    selectAllUsers(state).map((item) => item.name),
  );
  const { t } = useTranslation();

  //   useEffect(() => {
  //     if (users) {
  //       const arrayOfUsers = users.map((item) => item.name);
  //       //   const usernames = [...existedUsers, ...arrayOfUsers];
  //       setExistedUsers(arrayOfUsers);
  //     }
  //   }, [users]);
  //   console.log('existedUsers', existedUsers);

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .max(20, t('validation.usernameMaxLength'))
          .min(3, t('validation.usernameMinLength'))
          .required(t('validation.requiredField'))
          .notOneOf(users, t('validation.existedUser')),
        password: Yup.string()
          .max(20, t('validation.passwordMaxLength'))
          .min(6, t('validation.passwordMinLength'))
          .required(t('validation.requiredField')),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], t('validation.confirmPassword'))
          .required(t('validation.requiredField')),
      })}
      onSubmit={onSubmitLogic}
    >
      {({ touched, errors }) => (
        <Form noValidate>
          <Row>
            <SignUpImage />
            <SignUpFields touched={touched} errors={errors} />
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
