import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import _ from 'lodash';
import leoProfanity from 'leo-profanity';
import { Col, Container, Row } from 'react-bootstrap';
import Channels from '@components/channelsField/Channels';
import ChatInfo from '@components/channelsField/ChatInfo';
import MessageBox from '@components/messageField/MessageBox';
import MessageForm from '@components/messageField/MessageForm';
// import {
//   addChannels,
//   addMessage,
//   selectMessagesByChannelId,
//   setCurrentChannel,
//   setCurrentChannelId,
// } from '@slices/channelsSlice';
// import addChannels from '@utils/channelsFunction/addChannel';

import {
  addChannels,
  setCurrentChannel,
  setCurrentChannelId,
} from '@slices/channelsSlice';
import { addMessage, selectMessagesByChannelId } from '@slices/messagesSlice';
import socket from '@utils/webSocket';
import { errorOnRequest } from '@utils/toast/notify';

const ChatPage = () => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(
    (state) => state.channels?.currentChannelId,
  );
  //   const currentChannel = useSelector((state) => state.channels.currentChannel);
  const messages = useSelector((state) =>
    selectMessagesByChannelId(state, currentChannelId),
  );
  console.log('ProblematicMessages', messages);

  //   const nado = useSelector((state) => state);
  //   const { onSubmitLogic } = useMessageSubmit();
  //   console.log('nado', nado);

  useEffect(() => {
    const handleMessage = (message) => {
      try {
        const { channelId } = message;
        console.log('messageChatPage', message);

        dispatch(addMessage({ channelId, message }));
      } catch (e) {
        console.error(e);
        errorOnRequest();
      }
    };
    // возможно лишняя логика?

    socket.on('newMessage', handleMessage);

    const getChannels = async (token) => {
      try {
        const response = await axios.get('/api/v1/channels', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setCurrentChannel(response.data[0].name));
        dispatch(setCurrentChannelId(response.data[0].id)); // стартовый канал и стартовый id
        dispatch(addChannels(response.data));
      } catch (e) {
        errorOnRequest();
        console.error('Failed to fetch channels:', e);
      }
    };
    getChannels(localStorage.getItem('token'));
    return () => {
      socket.off('newMessage', handleMessage);
    };
  }, [dispatch]);

  return (
    <Container className="shadow-lg  border-1 rounded my-3  overflow-hidden bg-white">
      <Row>
        <Col className="p-2" xs={4} md={2}>
          <Channels />
        </Col>
        <Col xs={8} md={10} className="p-1 d-flex flex-column">
          <ChatInfo messages={messages} />
          <MessageBox messages={messages} />
          <MessageForm />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
