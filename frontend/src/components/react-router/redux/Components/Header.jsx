import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Col, Nav, NavDropdown, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styles from '../css/Header.module.css';

const Header = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const changeLanguageHandler = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <Container fluid>
      <Navbar data-bs-theme="blue" className="bg-body-tertiary d-flex">
        <Row className="mx-auto">
          <div>
            <img src="/icon.svg" alt="dasdasda" />
            <p>dasdasdada</p>
          </div>
          <Col md="auto">
            {location.pathname !== '/' ? (
              <Link
                style={{ textDecoration: 'none', borderRadius: '10%' }}
                to="/login"
              >
                <Navbar.Brand>{t('welcome')}</Navbar.Brand>
              </Link>
            ) : (
              <Navbar.Brand>{t('welcome')}</Navbar.Brand>
            )}
          </Col>
        </Row>
        <Navbar.Collapse
          className="justify-content-start"
          id="responsive-navbar-nav"
        >
          <Nav className="mr-auto">
            <NavDropdown
              title={
                <img
                  src="frontend/src/components/react-router/redux/Components/icon.svg/Users/ilakopendoh/Desktop/js-react-developer-project-12/frontend/src/components/react-router/redux/Components/icon.svg"
                  alt="languageChange"
                  width="25px"
                  style={{ imageRendering: 'high-quality' }}
                />
              }
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => changeLanguageHandler('en')}>
                EN
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguageHandler('ru')}>
                RU
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </Navbar>
      {location.pathname === '/' ? (
        <Link to="/login">
          <Button
            size="xs"
            style={{ position: 'absolute', top: '15px', right: '5px' }}
            variant="primary"
          >
            {t('exit')}
          </Button>
        </Link>
      ) : (
        <Link className={styles.link_reference} to="/login" />
      )}
    </Container>
  );
};
export default Header;
