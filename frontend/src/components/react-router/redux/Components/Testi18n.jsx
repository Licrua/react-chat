// import leoProfanity from 'leo-profanity';
// eslint-disable-next-line no-unused-vars
import { Col, Container, Row, Image, Form } from 'react-bootstrap';
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
  // const text = 'shit fuck moron fucker pussy dick';
  // leoProfanity.loadDictionary('ru');
  // leoProfanity.loadDictionary('en');
  // leoProfanity.add(['badword']);
  // function checker() {
  //   const proverka = leoProfanity.check(text);
  //   console.log('proverka', proverka);
  //   const clean = leoProfanity.clean(text);
  //   console.log('clean', clean);
  //   return clean;
  // }
  // checker();
  // const currentChannelId = useSelector(
  //   (state) => state.channels.currentChannelId,
  // );
  // const currentChannel = useSelector((state) => state.channels.currentChannel);
  // const messages = useSelector((state) =>
  //   selectMessagesByChannelId(state, currentChannelId),
  // );

  // const handleMessageSubmit = async (values, { setSubmitting, resetForm }) => {
  //   const newMessage = {
  //     id: _.uniqueId(),
  //     value: leoProfanity.clean(values.message),
  //     channelId: currentChannelId,
  //     username: localStorage.getItem('username'),
  //   };

  //   console.log('на сабмите', newMessage);
  //   try {
  //     await axios.post('/api/v1/messages', newMessage, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });
  //   } catch (error) {
  //     errorOnRequest();
  //     console.error('Failed to send message:', error);
  //   } finally {
  //     setSubmitting(false);
  //     resetForm();
  //   }
  // };

  // function slicer(value) {
  //   if (value.length >= 9) {
  //     return String(value).slice(0, 8) + '.'.repeat(3);
  //   }
  //   return value;
  // }
  // console.log(slicer('dasdassdasdjasdka'));

  return (
    <>
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
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Example textarea</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Example textarea</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        {/* <Row>
          <Col>
            <Image
              src="https://www.drupal.org/files/project-images/reg_confirm_email_with_button_0.png"
              fluid
              roundedCircle
            />
          </Col>
          <Col className="bg-black">LOGIN</Col>
          xl
          <Col className="bg-danger" />
          <Col className="bg-success">PASSWORD</Col>
          <Col className="bg-info">CONFIRM PASSWORD</Col>
        </Row> */}
      </Container>
      {/* <Header /> */}
      {/* <Container
        className="shadow-lg border-1 my-3 border-white rounded w-100 bg-white"
        style={{ height: '500px' }}
      >
        <Row className="h-100">
          <Col
            xs={2}
            className="p-0 d-flex flex-column"
            style={{ height: '100%' }}
          >
            <Channels />
          </Col>
          <Col xs={10} className="p-0 d-flex flex-column ">
            <ChatInfo currentChannel={currentChannel} messages={messages} />
            <MessageBox messages={messages} />
            <MessageForm handleMessageSubmit={handleMessageSubmit} />
          </Col>
        </Row>
      </Container> */}
    </>
  );
};

export default Testi18n;

// возможность добавить пробелы в addChannel
// изменить overFlowY -auto
