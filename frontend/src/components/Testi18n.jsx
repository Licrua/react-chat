// import leoProfanity from 'leo-profanity';
// eslint-disable-next-line no-unused-vars
import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { useEffect } from 'react';
// import _ from 'lodash';
// import Header from './Header';
// import Channels from './Channels';
// import { selectMessagesByChannelId } from '../channelsSlice';
// import { errorOnRequest } from '../../../../toast/notify';
// import {
//   addChannels,
//   addMessager,
//   setConcurrentChannel,
//   setConcurrentChannelId,
// } from '../redux/channelsSlice';
// import ChatBody from '../redux/Components/ChatBody';
// import ChatContainer from '../redux/Components/ChatContainer';
// import ChatInfo from './ChatInfo';
// import MessageBox from './MessageBox';
// import MessageForm from './MessageForm';
// import MessageForm from '../redux/Components/MessageForm';
// import socket from '../webSocket';
// import { errorOnRequest } from '../../../toast/notify';

// const ChatInfo = () => {
//   return (
//     <div style={{ backgroundColor: 'purple' }}>
//       <p>General</p>
//       <p>0 messages</p>
//     </div>
//   );
// };

const Testi18n = () => {
  const [log, setLog] = useState('');
  const [pass, setPass] = useState('');

  const axiousSignUpUser = async () => {
    const request = await axios.post('/api/v1/signup', {
      username: log,
      password: pass,
    });
    return request.data;
  };

  const changeHandlerLogin = (e) => {
    setLog(e.target.value);
  };

  const changeHandlerPassword = (e) => {
    setPass(e.target.value);
  };

  return (
    <Container>
      <Form>
        <Row>
          <Col xs={4} className="my-4">
            <Image
              src="https://www.drupal.org/files/project-images/reg_confirm_email_with_button_0.png"
              fluid
              roundedCircle
            />
          </Col>
          <Col className="d-flex flex-column justify-content-center">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={changeHandlerLogin}
                value={log}
                type="email"
                placeholder="name@example.com"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control
                value={pass}
                type="password"
                onChange={changeHandlerPassword}
              />
            </Form.Group>
            <Button onClick={axiousSignUpUser}>Отправить</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Testi18n;
