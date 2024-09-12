import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import navLinks from '@data/footer/navLinks';

const FooterNavigation = () => {
  return (
    <Nav className="d-flex justify-content-center ">
      {navLinks.map((item) => (
        <Nav.Link
          className="text-secondary"
          key={item.id}
          as={Link}
          to={item.path}
        >
          {item.label}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default FooterNavigation;
