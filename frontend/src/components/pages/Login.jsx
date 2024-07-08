import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  Button,
  Container,
  Form as BootstrapForm,
  Col,
  Row,
  Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import styles from './Login.module.css';
import { selectAllUsers } from '../redux/channelsSlice';
import Header from '../redux/Components/Header';

const Login = () => {
  const users = useSelector((state) => selectAllUsers(state));
  const sortedUsers = users.map((item) => item.name);
  const navigate = useNavigate();
  const loginRef = useRef();
  const { t } = useTranslation();
  console.log('sortedUsers', sortedUsers);

  useEffect(() => {
    loginRef.current.focus();
  });

  return (
    <>
      <Header />
      <Container className={styles.login_container}>
        <h1 className="d-flex justify-content-center">{t('authorization')}</h1>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={Yup.object({
            username: Yup.string().required(t('validation.requiredField')),
            password: Yup.string().oneOf(
              sortedUsers,
              t('validation.inccorectData'),
            ),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log('values', values);
            setSubmitting(true);
            async function main() {
              async function loginUser() {
                try {
                  const login = await axios.post('/api/v1/login', {
                    username: values.username,
                    password: values.password,
                  });
                  localStorage.setItem('token', login.data.token);
                  localStorage.setItem('username', login.data.username);
                  console.log('login', login);
                } catch (e) {
                  console.log('Ошибка', e.message);
                } finally {
                  setSubmitting(false);
                }
              }
              await loginUser();
              navigate('/');
            }
            main();
          }}
        >
          {({ touched, errors, handleChange, handleSubmit }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row>
                <Col xs={5} sm={5}>
                  <Image
                    src="https://cdn-icons-png.freepik.com/512/5087/5087579.png"
                    width="100%"
                    roundedCircle
                  />
                </Col>
                <Col
                  xs={5}
                  sm={5}
                  className="d-flex flex-column justify-content-center"
                >
                  <BootstrapForm.Group>
                    <BootstrapForm.Label htmlFor="username">
                      {t('username')}
                    </BootstrapForm.Label>
                    <BootstrapForm.Control
                      required
                      innerRef={loginRef}
                      type="text"
                      name="username"
                      onChange={handleChange}
                      as={Field}
                      isInvalid={touched.username && errors.username}
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className={styles.error}
                    />
                  </BootstrapForm.Group>
                  <BootstrapForm.Group>
                    <BootstrapForm.Label htmlFor="password">
                      {t('password')}
                    </BootstrapForm.Label>
                    <Field
                      required
                      type="password"
                      name="password"
                      onChange={handleChange}
                      isInvalid={touched.password && errors.password}
                      as={BootstrapForm.Control}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={styles.error}
                    />
                  </BootstrapForm.Group>
                  <Button
                    style={{ margin: '20px 0px' }}
                    variant="outline-primary"
                    type="submit"
                  >
                    {t('logIn')}
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
        <hr />
        <div className={styles.link_container}>
          {t('account')}
          <Link className={styles.link_to_signup} to="/signUp">
            {t('signUp')}
          </Link>
        </div>
      </Container>
    </>
  );
};
export default Login;
