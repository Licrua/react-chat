import { useTranslation } from "react-i18next";
import { Container, Row, Col, Navbar, NavbarBrand } from "react-bootstrap";

const Component = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = () => {
    i18n.changeLanguage("ru");
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="justify-content-start">
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default Component;
