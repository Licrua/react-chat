import { Form as BootstrapForm, Button, Col } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';
import styles from '@styles/SignUp.module.scss';
import { useTranslation } from 'react-i18next';
import formFields from '@data/signUp/signUpFields';

const SignUpFields = ({ touched, errors }) => {
  const { t } = useTranslation();
  return (
    <Col
      xs={7}
      lg={6}
      className="d-flex gap-2 flex-column justify-content-center"
    >
      {formFields.map(({ id, label, type }) => (
        <BootstrapForm.Group key={id}>
          <BootstrapForm.Label htmlFor={id}>{t(label)}</BootstrapForm.Label>
          <BootstrapForm.Control
            as={Field}
            type={type}
            name={id}
            id={id}
            autoFocus={id === 'username'}
            isInvalid={touched[id] && !!errors[id]}
          />
          <ErrorMessage name={id} component="div" className={styles.error} />
        </BootstrapForm.Group>
      ))}
      {/* <BootstrapForm.Group>
        <BootstrapForm.Label htmlFor="username">
          {t('signUpFields.username')}
        </BootstrapForm.Label>
        <BootstrapForm.Control
          autoFocus
          as={Field}
          type="text"
          name="username"
          id="username"
          isInvalid={touched.username && !!errors.username}
        />
        <ErrorMessage
          name="username"
          component="div"
          className={styles.error}
        />
      </BootstrapForm.Group>
      <BootstrapForm.Group>
        <BootstrapForm.Label htmlFor="password">
          {t('signUpFields.password')}
        </BootstrapForm.Label>
        <BootstrapForm.Control
          as={Field}
          type="password"
          name="password"
          id="password"
          isInvalid={touched.password && !!errors.password}
        />
        <ErrorMessage
          name="password"
          component="div"
          className={styles.error}
        />
      </BootstrapForm.Group>
      <BootstrapForm.Group>
        <BootstrapForm.Label htmlFor="confirmPassword">
          {t('signUpFields.confirmPassword')}
        </BootstrapForm.Label>
        <BootstrapForm.Control
          as={Field}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          isInvalid={touched.confirmPassword && !!errors.confirmPassword}
        />
        <ErrorMessage
          name="confirmPassword"
          component="div"
          className={styles.error}
        />
      </BootstrapForm.Group> */}
      <Button
        className="my-4"
        onClick={() => console.log('давай вперед')}
        variant="outline-primary"
        type="submit"
      >
        {t('signUpFields.register')}
      </Button>
    </Col>
  );
};

export default SignUpFields;
