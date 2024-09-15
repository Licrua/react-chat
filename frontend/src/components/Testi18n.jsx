// import leoProfanity from 'leo-profanity';
// eslint-disable-next-line no-unused-vars
import {
  Col,
  Container,
  Row,
  Image,
  Form,
  Button,
  Dropdown,
  ButtonGroup,
  SplitButton,
} from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
// import { uniqueId } from 'lodash';
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
  const [inputValue, setInputValue] = useState('');
  const storage = localStorage.getItem('info');
  useEffect(() => {
    console.log('localeStorage', JSON.parse(localStorage.getItem('info')));
  }, [storage]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    console.log('inputValue', inputValue);
  };

  //   const saveUsersToLocalStorage = (users) => {
  //     localStorage.setItem('users', JSON.stringify(users));
  //   };

  const getUsersFromLocalStorage = () => {
    const storedUsers = localStorage.getItem('info');
    return storedUsers ? JSON.parse(storedUsers) : [];
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const prevResult = getUsersFromLocalStorage();
    const newResult = { id: Date.now(), username: inputValue };
    localStorage.setItem('info', JSON.stringify([...prevResult, newResult]));
    console.log('Submitted value:', inputValue);
  };

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
      <Row>
        <Col>
          <form onSubmit={handleSubmit}>
            <label htmlFor="myInput">
              <input
                id="myInput"
                type="text"
                value={inputValue} // Привязка значения к состоянию
                onChange={handleChange} // Обработчик изменений
              />
              Enter smth
            </label>
            <button type="submit">Submit</button>
          </form>
        </Col>
      </Row>
      <Form>
        <Row>
          <Col xs={4} className="my-4">
            <SplitButton
              id="dropdown-split-variants-1"
              variant="primary"
              title="name"
            >
              <Dropdown.Item eventKey="1">Action</Dropdown.Item>
              <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
              <Dropdown.Item eventKey="3" active>
                Active Item
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
            </SplitButton>
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
