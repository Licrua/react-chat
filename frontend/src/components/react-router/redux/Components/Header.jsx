import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Col, Nav, NavDropdown, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styles from '../css/Header.module.css';
import icon from '../icons/languages.png';

const Header = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const changeLanguageHandler = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <Container fluid>
      <Navbar data-bs-theme="blue" className="bg-body-tertiary">
        <Navbar.Collapse
          className="justify-content-start"
          id="responsive-navbar-nav"
        >
          <Nav className="mr-auto">
            <NavDropdown
              title={
                <img
                  src={icon}
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
        <Container>
          <Row className="mx-auto">
            <Col md="auto">
              {location.pathname !== '/' ? (
                <Link
                  style={{ textDecoration: 'none', borderRadius: '10%' }}
                  to="/login"
                >
                  <Navbar.Text>{t('welcome')}</Navbar.Text>
                </Link>
              ) : (
                <Navbar.Text>{t('welcome')}</Navbar.Text>
              )}
            </Col>
          </Row>
        </Container>
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
        <Link className={styles.link_reference} to="/login">
          {/* <Navbar.Text>{t('welcome')}</Navbar.Text> */}
        </Link>
      )}
    </Container>
  );
};
export default Header;
