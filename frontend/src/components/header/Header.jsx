// import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import headerTitleImage from '@assets/icons/technical-support.png';
import languageLogo from '@assets/icons/translator.png';
import { motion } from 'framer-motion';
import setLanguage from '@utils/setLanguage';

const Header = () => {
  //   const location = useLocation();
  const { t, i18n } = useTranslation();

  //   const changeLanguageHandler = (lang) => {
  //     i18n.changeLanguage(lang);
  //   };
  return (
    // <Container className="border-1 border-bottom" fluid>
    //   <Navbar data-bs-theme="blue" className="bg-body-tertiary d-flex">
    //     <Row className="mx-auto">
    //       <Col md="auto">
    //         {location.pathname !== '/' ? (
    //           <Link
    //             style={{ textDecoration: 'none', borderRadius: '10%' }}
    //             to="/login"
    //           >
    //             <Navbar.Brand>
    //               <p>{t('title')}</p>
    //               <small className="text-muted">{t('subTitle')}</small>
    //             </Navbar.Brand>
    //           </Link>
    //         ) : (
    //           <Navbar.Brand>{t('title')}</Navbar.Brand>
    //         )}
    //       </Col>
    //     </Row>
    //     <Navbar.Collapse
    //       className="justify-content-start"
    //       id="responsive-navbar-nav"
    //     >
    //       <Nav className="mr-auto">
    //         <NavDropdown
    //           title={
    //             <img
    //               src={icon}
    //               alt="languageChange"
    //               width="25px"
    //               style={{ imageRendering: 'high-quality' }}
    //             />
    //           }
    //           id="collapsible-nav-dropdown"
    //         >
    //           <NavDropdown.Item onClick={() => changeLanguageHandler('en')}>
    //             EN
    //           </NavDropdown.Item>
    //           <NavDropdown.Item onClick={() => changeLanguageHandler('ru')}>
    //             RU
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //       </Nav>
    //     </Navbar.Collapse>
    //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //   </Navbar>
    //   {location.pathname === '/' ? (
    //     <Link to="/login">
    //       <Button
    //         size="xs"
    //         style={{ position: 'absolute', top: '15px', right: '5px' }}
    //         variant="primary"
    //       >
    //         {t('exit')}
    //       </Button>
    //     </Link>
    //   ) : (
    //     <Link className={styles.link_reference} to="/login" />
    //   )}
    // </Container>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <img
          alt="chat_header_icon"
          src={headerTitleImage}
          width="40"
          height="40"
          className="d-inline-block align-top me-2"
        />{' '}
        <Navbar.Brand href="#home">
          <motion.span
            animate={{
              color: ['##000000', '##ffffff', '##000000', '##ffffff'],
              textShadow:
                '-1px -1px 0 #00000000, 1px -1px 0 #00000000, -1px 1px 0 #00000000, 1px 1px 0 #0000002a',
            }}
            transition={{
              duration: 5,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="ms-2 fw-italic"
            style={{ letterSpacing: '2px' }}
          >
            {t('title')}
            <em>
              <div style={{ fontSize: '0.6em', marginLeft: '20px' }}>
                {t('subTitle')}
              </div>
            </em>
          </motion.span>
          {/* <a
            href="https://www.flaticon.com/free-icons/dialogue"
            title="dialogue icons"
          >
            Dialogue icons created by juicy_fish - Flaticon
          </a> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Об Авторе</Nav.Link>
            <Nav.Link href="#link">О Проекте</Nav.Link>
            <NavDropdown
              align="end"
              className="mx-5"
              title={
                <motion.img
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  width="40"
                  height="40"
                  src={languageLogo}
                  alt="language_img"
                />
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                href="#action/3.1"
                onClick={() => setLanguage('ru')}
              >
                {t('navigation.language.russian')}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="#action/3.2"
                onClick={() => setLanguage('en')}
              >
                {t('navigation.language.english')}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
