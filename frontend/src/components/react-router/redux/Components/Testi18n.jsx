import leoProfanity from 'leo-profanity';
// eslint-disable-next-line no-unused-vars
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';

const Testi18n = () => {
  const text = 'shit fuck moron fucker pussy dick';
  const ref = useRef();
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    ref.current.focus();
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    // Далее можете выполнить другие операции при успешной валидации
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="petik">
        <Form.Label>Username</Form.Label>
        <Form.Control
          innerRef={ref}
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid username.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        <Form.Control.Feedback type="invalid">
          Password must be at least 6 characters.
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit">Submit</Button>
    </Form>
    // <Container>
    //   <Row style={{ height: '100vh' }}>
    //     {/* Левый блок каналов */}
    //     <Col
    //       style={{ borderRight: '2px green solid' }}
    //       className="bg-light border-right p-3 w-30"
    //     >
    //       <h5>Channels</h5>
    //       <ul className="list-unstyled">
    //         <li># General</li>
    //         <li># Random</li>
    //         <li># Development</li>
    //       </ul>
    //     </Col>

    //     {/* Основной блок чата */}
    //     <Col className="d-flex flex-column">
    //       {/* Верхний блок с наименованиями каналов */}
    //       <Row className="bg-light border-bottom p-3">
    //         <h5>General</h5>
    //       </Row>

    //       {/* Основное окно чата */}
    //       <Row className="flex-grow-1 p-3" style={{ overflowY: 'auto' }}>
    //         <Col>
    //           <div className="chat-message">
    //             <strong>User1:</strong> Hello!
    //           </div>
    //           <div className="chat-message">
    //             <strong>User2:</strong> Hi there!
    //             <strong>User2:</strong> Hi there!
    //             <strong>User2:</strong> Hi there!
    //             <strong>User2:</strong> Hi there!
    //             <strong>User2:</strong> Hi there!
    //             <strong>User2:</strong> Hi there!
    //             <strong>User2:</strong> Hi there!
    //           </div>
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>{' '}
    //           <div className="chat-message">
    //             <strong>dasdadad</strong>
    //           </div>
    //           {/* Добавьте больше сообщений по мере необходимости */}
    //         </Col>
    //       </Row>

    //       {/* Вводная строка */}
    //       <Row className="bg-light p-3">
    //         <Col>
    //           <InputGroup>
    //             <Form.Control placeholder="Type your message..." />
    //             <InputGroup>
    //               <Button variant="primary">Send</Button>
    //             </InputGroup>
    //           </InputGroup>
    //         </Col>
    //       </Row>
    //     </Col>
    //   </Row>
    // </Container>
  );
};

export default Testi18n;
