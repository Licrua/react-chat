import { Navbar, Row } from 'react-bootstrap';

const FooterSocialNovbar = ({ socialIcons }) => {
  return (
    <Row>
      <Navbar bg="light" expand="lg" className="d-flex  justify-content-center">
        {socialIcons.map((item) => (
          <Navbar.Brand target="_blank" key={item.id} href={item.href}>
            <img
              src={item.src}
              alt={item.alt}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        ))}
      </Navbar>
    </Row>
  );
};
export default FooterSocialNovbar;
