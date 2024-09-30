import { Field, ErrorMessage } from 'formik';
import { Form as BootstrapForm } from 'react-bootstrap';
import styles from '@styles/Login.module.scss';
import { useTranslation } from 'react-i18next';

const LoginUsernameField = ({ touched, errors }) => {
  const { t } = useTranslation();
  return (
    <BootstrapForm.Group>
      <BootstrapForm.Label htmlFor="username">
        {t('nickname')}
      </BootstrapForm.Label>
      <BootstrapForm.Control
        autoFocus
        required
        type="text"
        name="username"
        as={Field}
        isInvalid={touched.username && errors.username}
      />
      <ErrorMessage name="username" component="div" className={styles.error} />
    </BootstrapForm.Group>
  );
};
export default LoginUsernameField;
