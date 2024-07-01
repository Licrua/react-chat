import leoProfanity from 'leo-profanity';
// eslint-disable-next-line no-unused-vars
import { Container, Row, Col } from 'react-bootstrap';

const Testi18n = () => {
  const text = 'shit fuck moron fucker pussy dick';
  leoProfanity.loadDictionary('ru');
  leoProfanity.loadDictionary('en');
  leoProfanity.add(['badword']);
  function checker() {
    const proverka = leoProfanity.check(text);
    console.log('proverka', proverka);
    const clean = leoProfanity.clean(text);
    console.log('clean', clean);
    return clean;
  }
  checker();

  return (
    <Container fluid="xl">
      <Row style={{ border: '2px solid' }} className="flex-column">
        <Col>Каналы</Col>
        <Col>
          <button type="button">+</button>
        </Col>
        <Col>general</Col>
        <Col>general</Col>
        <Col>general</Col>
        <Col>general</Col>
      </Row>
      <Row className="flex-column">
        <Col>djasdasjd</Col>
      </Row>
    </Container>
  );
};

export default Testi18n;
