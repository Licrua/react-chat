import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Form as BootstrapForm,
  Col,
  Row,
  Image,
} from 'react-bootstrap';
import styles from '@styles/Login.module.scss';
import loginIcon from '@assets/icons/login_icon.png';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import LoginImage from './LoginImage';
import LoginUsernameField from './LoginUsernameField';
import LoginPasswordField from './LoginPasswordField';

const LoginForm = ({ onSubmitLogic }) => {
  const { t } = useTranslation();
  const [usersArray, setUsersArray] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('username'));
    const usernames = storedUsers.map((item) => item.name);
    if (storedUsers) {
      setUsersArray(usernames);
    }
  }, []);

  const validationSchema = Yup.object({
    username: Yup.string()
      .required(t('validation.requiredField'))
      .oneOf(usersArray, t('validation.incorrectData')),
    password: Yup.string().required(t('validation.requiredField')),
  });

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmitLogic}
    >
      {({ touched, errors }) => (
        <Form noValidate>
          <Row>
            <Col className="d-flex justify-content-center" sm={5} md={6} lg={6}>
              <LoginImage />
            </Col>
            <Col
              sm={5}
              md={6}
              lg={4}
              className="d-flex flex-column justify-content-center"
            >
              <LoginUsernameField touched={touched} errors={errors} />
              <LoginPasswordField touched={touched} errors={errors} />
              <Button className="mt-3" variant="outline-primary" type="submit">
                {t('logIn')}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
