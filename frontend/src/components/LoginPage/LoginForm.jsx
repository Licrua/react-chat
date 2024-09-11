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

const LoginForm = ({ onSubmitLogic, sortedUsers }) => {
  const { t } = useTranslation();

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string().required(t('validation.requiredField')),
        password: Yup.string().oneOf(
          [...sortedUsers, 'admin'],
          t('validation.inccorectData'),
        ),
      })}
      onSubmit={onSubmitLogic}
    >
      {({ touched, errors, handleChange, handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Col sm={5}>
              <Image src={loginIcon} width="100%" roundedCircle />
            </Col>
            <Col sm={5} className="d-flex flex-column justify-content-center">
              <BootstrapForm.Group>
                <BootstrapForm.Label htmlFor="username">
                  {t('nickname')}
                </BootstrapForm.Label>
                <BootstrapForm.Control
                  autoFocus
                  required
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
                <BootstrapForm.Control
                  required
                  type="password"
                  name="password"
                  onChange={handleChange}
                  isInvalid={touched.password && errors.password}
                  as={Field}
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
  );
};

export default LoginForm;
