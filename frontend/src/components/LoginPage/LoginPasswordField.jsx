import { Field, ErrorMessage } from 'formik';
import { Form as BootstrapForm } from 'react-bootstrap';
import styles from '@styles/Login.module.scss';
import { useTranslation } from 'react-i18next';

const LoginPasswordField = ({ touched, errors }) => {
  const { t } = useTranslation();
  return (
    <BootstrapForm.Group>
      <BootstrapForm.Label
        style={{ fontFamily: 'Snell Roundhand, cursive' }}
        className="mt-1"
        htmlFor="password"
      >
        {t('password')}
      </BootstrapForm.Label>
      <BootstrapForm.Control
        required
        type="password"
        name="password"
        //   onChange={handleChange}
        isInvalid={touched.password && errors.password}
        as={Field}
      />
      <ErrorMessage name="password" component="div" className={styles.error} />
    </BootstrapForm.Group>
  );
};

export default LoginPasswordField;
