import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Form as BootstrapForm,
  Col,
  Row,
  Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import useLoginSubmit from 'hooks/useLoginSubmit';
import LoginImage from './LoginImage';
import LoginFields from './LoginFields';

const LoginForm = () => {
  const { t } = useTranslation();
  const [usersArray, setUsersArray] = useState([]);
  const { onSubmitLogic } = useLoginSubmit();

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
            <Col className="d-flex justify-content-center" sm={5} md={6} lg={5}>
              <LoginImage />
            </Col>
            <Col
              sm={5}
              md={6}
              lg={5}
              className="d-flex flex-column justify-content-center"
            >
              <LoginFields touched={touched} errors={errors} />
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
