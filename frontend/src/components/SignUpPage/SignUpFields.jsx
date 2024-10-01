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
      lg={5}
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
      <Button className="my-4" variant="outline-primary" type="submit">
        {t('signUpFields.register')}
      </Button>
    </Col>
  );
};

export default SignUpFields;
