// import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';
import HeaderSecondaryInfo from './HeaderSecondaryInfo';
import HeaderLanguageDropdown from './HeaderLanguageDropdown';
import HeaderTitle from './HeaderTitle';

const Header = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Navbar expand="lg" className="bg-body-tertiary border rounded p-1">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        <HeaderTitle />
        {location.pathname === '/' ? (
          <Link to="/login">
            <Button variant="primary">{t('exit')}</Button>
          </Link>
        ) : (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" />
              <Nav>
                <HeaderLanguageDropdown />
                <HeaderSecondaryInfo />
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};
export default Header;

// <Navbar
// sticky="top"
// expand="lg"
// className="bg-body-tertiary mb-3 border rounded p-1"
// >
// <Container
//   fluid
//   className="d-flex justify-content-between align-items-center "
// >
// 	<HeaderTitle/>
// 	{location.pathname === '/'  ?
//         <Link to="/login">
//           <Button variant="primary">{t('exit')}</Button>
//         </Link> :   <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto" />
//           <Nav>
//             <HeaderLanguageDropdown />
//             <HeaderSecondaryInfo />
//           </Nav>
//         </Navbar.Collapse>  }
// 	<Container/>
// 	<Navbar/>

/* <a target="_blank" href="https://icons8.com/icon/23343/contact-info">Contact Info</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */
/* <a
            href="https://www.flaticon.com/free-icons/dialogue"
            title="dialogue icons"
          >
            Dialogue icons created by juicy_fish - Flaticon
          </a> */

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
