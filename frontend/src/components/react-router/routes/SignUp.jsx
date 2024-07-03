import { Button, Form as BootstrapForm, Container } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { newUser } from '../request';
import Header from '../redux/Components/Header';
import { addUser, selectAllUsers } from '../redux/channelsSlice';
import styles from './SignUp.module.css';

const SignUp = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const users = useSelector((state) => selectAllUsers(state));
  const sortedUsers = users.map((item) => item.name);
  const usernameRef = useRef();
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .max(20, t('validation.username'))
      .min(3, t('validation.username'))
      .required(t('validation.requiredField'))
      .notOneOf(sortedUsers, t('validation.existedUser')),
    password: Yup.string()
      .max(20, t('validation.passwordMaxLength'))
      .min(6, t('validation.passwordMinLength'))
      .required(t('validation.requiredField')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('validation.confirmPassword'))
      .required(t('validation.requiredField')),
  });

  const handleOnSubmit = async (values, { setSubmitting }) => {
    try {
      console.log(values, 'signUp values');
      await newUser(values.username, values.password); // Assuming newUser is a function returning a promise
      dispatch(addUser({ id: _.uniqueId(), name: values.username }));
      navigate('/');
    } catch (error) {
      console.error('Error during sign-up', error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    usernameRef.current.focus();
  });

  return (
    <>
      <Header />
      <Container className={styles.container}>
        <h1
          style={{ fontFamily: 'cursive', fontWeight: '900', padding: '10px' }}
        >
          {t('registration')}
        </h1>
        <Formik
          initialValues={{ username: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleOnSubmit}
        >
          {({ touched, errors }) => (
            <Form noValidate>
              <BootstrapForm.Group>
                <BootstrapForm.Label>{t('username')}</BootstrapForm.Label>
                <BootstrapForm.Control
                  as={Field}
                  type="text"
                  name="username"
                  innerRef={usernameRef}
                  isInvalid={touched.username && !!errors.username}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className={styles.error}
                />
              </BootstrapForm.Group>
              <BootstrapForm.Group>
                <BootstrapForm.Label>{t('password')}</BootstrapForm.Label>
                <BootstrapForm.Control
                  as={Field}
                  type="password"
                  name="password"
                  isInvalid={touched.password && !!errors.password}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </BootstrapForm.Group>
              <BootstrapForm.Group>
                <BootstrapForm.Label>
                  {t('confirmPassword')}
                </BootstrapForm.Label>
                <BootstrapForm.Control
                  as={Field}
                  type="password"
                  name="confirmPassword"
                  isInvalid={
                    touched.confirmPassword && !!errors.confirmPassword
                  }
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={styles.error}
                />
              </BootstrapForm.Group>
              <Button
                style={{ margin: '10px 0px' }}
                variant="outline-primary"
                type="submit"
              >
                {t('registrate')}
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};
export default SignUp;
