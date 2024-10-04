import { Formik, Form } from 'formik';
import { Col, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useSignUpSubmit from 'hooks/useSignUpSubmit';
import { selectAllUsers } from '@slices/usersSlice';
// import { useState, useEffect } from 'react';
import GeneralImage from '@components/generalAuthComponents/GeneralImage';
import signUpImage from '@assets/icons/pngwing.com (2).png';
import GeneralFields from '@components/generalAuthComponents/GeneralFields';
import signUpField from '@data/signUp/signUpFields';
// import SignUpImage from './SignUpImage';

const SignUpForm = () => {
  const { onSubmitLogic } = useSignUpSubmit();
  //   const [existedUsers, setExistedUsers] = useState([]);
  const users = useSelector((state) =>
    selectAllUsers(state).map((item) => item.name),
  );
  const { t } = useTranslation();

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
            <GeneralImage image={signUpImage} />
            <GeneralFields
              buttonText="signUpFields.register"
              formFields={signUpField}
              touched={touched}
              errors={errors}
            />
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
