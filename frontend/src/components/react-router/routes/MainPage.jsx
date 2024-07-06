import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import _ from 'lodash';
import leoProfanity from 'leo-profanity';
import { Col, Container, Row } from 'react-bootstrap';
import {
  addChannels,
  addMessager,
  selectMessagesByChannelId,
  setConcurrentChannel,
  setConcurrentChannelId,
} from '../redux/channelsSlice';
import Header from '../redux/Components/Header';
import Channels from '../redux/Components/Channels';
import ChatInfo from '../redux/Components/ChatInfo';
import MessageBox from '../redux/Components/MessageBox';
import MessageForm from '../redux/Components/MessageForm';
import socket from '../webSocket';
import { errorOnRequest } from '../../../toast/notify';

const MainPage = () => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const messages = useSelector((state) =>
    selectMessagesByChannelId(state, currentChannelId),
  );

  useEffect(() => {
    const handleMessage = (message) => {
      try {
        const { channelId } = message; // предположим, что сообщение содержит идентификатор канала
        dispatch(addMessager({ channelId, message }));
      } catch (e) {
        console.error(e);
        errorOnRequest();
      }
    };

    socket.on('newMessage', handleMessage);

    const getChannels = async (token) => {
      try {
        const response = await axios.get('/api/v1/channels', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setConcurrentChannel(response.data[0].name));
        dispatch(setConcurrentChannelId(response.data[0].id)); // стартовый канал и стартовый id
        dispatch(addChannels(response.data));
      } catch (error) {
        errorOnRequest();
        console.error('Failed to fetch channels:', error);
      }
    };
    getChannels(localStorage.getItem('token'));
  }, [dispatch]);

  const handleChannelClick = (channel) => {
    console.log('handleChannelClick', channel);
    dispatch(setConcurrentChannel(channel.name));
    dispatch(setConcurrentChannelId(channel.id));
  };

  const handleMessageSubmit = async (values, { setSubmitting, resetForm }) => {
    const newMessage = {
      id: _.uniqueId(),
      value: leoProfanity.clean(values.message),
      channelId: currentChannelId,
      username: localStorage.getItem('username'),
    };

    console.log('на сабмите', newMessage);
    try {
      await axios.post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      errorOnRequest();
      console.error('Failed to send message:', error);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <>
      <Header />
      <Container className="shadow-lg h-100  border-1 border-white rounded my-4 w-100 overflow-hidden bg-white">
        <Row className="h-100">
          <Col
            xs={5}
            sm={4}
            md={4}
            lg={2}
            className="p-0 d-flex h-100 flex-column"
          >
            <Channels handleChannelClick={handleChannelClick} />
          </Col>
          <Col xs={7} sm={7} md={8} lg={10} className="p-0 d-flex flex-column">
            <ChatInfo currentChannel={currentChannel} messages={messages} />
            <MessageBox messages={messages} />
            <MessageForm handleMessageSubmit={handleMessageSubmit} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MainPage;
