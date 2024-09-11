import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';

const SignUpFooter = () => {
  const { t } = useTranslation();

  return (
    <Col>
      <hr />
      <div className="d-flex justify-content-center">
        <p className="me-1">{t('signUpFields.isRegistered')}</p>
        <Link className="text-decoration-none bg-transparent" to="/login">
          {t('signUpFields.goToLogin')}
        </Link>
      </div>
    </Col>
  );
};

export default SignUpFooter;
