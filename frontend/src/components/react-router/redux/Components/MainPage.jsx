import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import _ from "lodash";
import { addChannels, addMessager } from "../channelsSlice";
import { selectAllChannels, selectAllMessages, } from "../channelsSlice";
import Header from "./Header";
import Channels from "./Channels";
import ChatBody from "./ChatBody";
import ChatContainer from "./ChatContainer";
import ChatInfo from "./ChatInfo";
import MessageBox from "./MessageBox";
import MessageForm from "./MessageForm";
import styles from '../css/MainPage.module.css'
import socket from "../../webSocket";
import { selectMessagesByChannelId } from "../channelsSlice";
import ChatPopUp from "./ChatPopUp";
// import icon from './icon.svg'
// import { Link } from "react-router-dom";
const MainPage = () => {
  const dispatch = useDispatch();
  const [currentChannel, setCurrentChannel] = useState(null);
  const [currentChannelId, setCurrentChannelId] = useState("");
  const [togglerPopUp, setTogglerPopUp] = useState(false)
  const messages = useSelector((state) => selectMessagesByChannelId(state, currentChannelId))
  console.log('messagessdasdadsada', messages);
  

  useEffect(() => {
    const handleMessage = (message) => {
      const channelId = message.channelId; // предположим, что сообщение содержит идентификатор канала
      console.log('currentMEssage', message)
      dispatch(addMessager({ channelId, message }));
    };

    socket.on('newMessage', handleMessage);
  

    const getChannels = async (token) => {
      try {
        const response = await axios.get("/api/v1/channels", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentChannel(response.data[0].name);
        setCurrentChannelId(response.data[0].id);
        dispatch(addChannels(response.data));
        console.log('getChannels', getChannels);
      } catch (error) {
        console.error("Failed to fetch channels:", error);
      }
    };
    getChannels(localStorage.getItem("token"));
    
  }, [dispatch, socket]);

  const handleChannelClick = (channel) => {
    setCurrentChannel(channel.name);
    setCurrentChannelId(channel.id);
  };

  const handleMessageSubmit = async (values, { setSubmitting, resetForm }) => {


    const newMessage = {
      id: _.uniqueId(),
      value: values.message,
      channelId: currentChannelId,
      username: localStorage.getItem("username"),
    };

    console.log('на сабмите', newMessage);
    try {
      await axios.post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSubmitting(false);
      resetForm()
    }
  };

  return (
    <>
   { togglerPopUp ?  <ChatPopUp proper={setTogglerPopUp} /> : null}
    <ChatContainer>
      <Header/>
      <ChatBody>
        <Channels handler={handleChannelClick} toggler={setTogglerPopUp}  />
        <ChatInfo currentChannel={currentChannel} messages={messages}  />
        <MessageBox messages={messages}/>
        <MessageForm handlerMessage={handleMessageSubmit} />
        </ChatBody>
      </ChatContainer>
    </>
  );
};

export default MainPage;

