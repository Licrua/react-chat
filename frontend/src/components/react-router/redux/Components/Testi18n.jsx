import { useTranslation } from "react-i18next";
import { Container, Row, Col, Navbar, NavbarBrand } from "react-bootstrap";
import Rebenok from "./Rebenok";
import { useRef } from "react";
import leoProfanity from 'leo-profanity';

const Component = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef()
  const ref2 = useRef()

  const onFocus = () => {
    ref.current.focus()
  }
  const onFocus2 = () => {
    ref2.current.focus()
  }
  const text = 'shit fuck moron fucker pussy dick'
  leoProfanity.loadDictionary('ru')
  leoProfanity.loadDictionary('en')
  leoProfanity.add(['badword'])
  function checker () {
    const proverka = leoProfanity.check(text);
    console.log('proverka', proverka);
    const clean = leoProfanity.clean(text);
    console.log('clean', clean);
    return clean
  }
  checker()

  const handleChangeLanguage = () => {
    i18n.changeLanguage("ru");
  };

  return (
    <>
    <Navbar>
      <Container>
        <Rebenok ref={ref} ref2={ref2}/>
        <button onClick={onFocus}>focus</button>
        <button onClick={onFocus2}>focus2</button>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="justify-content-start">
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default Component;
