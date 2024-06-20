import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import _ from "lodash";
import { addChannels, addMessager,  } from "../channelsSlice";
import { selectAllChannels, selectAllMessages } from "../channelsSlice";
import Header from "./Header";
import Channels from "./Channels";
import ChatBody from "./ChatBody";
import ChatContainer from "./ChatContainer";
import ChatInfo from "./ChatInfo";
import MessageBox from "./MessageBox";
import MessageForm from "./MessageForm";
import styles from "../css/MainPage.module.css";
import socket from "../../webSocket";
import { selectMessagesByChannelId } from "../channelsSlice";
import ChatPopUp from "./ChatPopUp";
import { setConcurrentChannel, setConcurrentChannelId } from "../channelsSlice";
import { getChannelsName } from "../channelsSlice";
// import icon from './icon.svg'
// import { Link } from "react-router-dom";
const MainPage = () => {
  const dispatch = useDispatch();
  // const [currentChannel, setCurrentChannel] = useState(null);
  // const [currentChannelId, setCurrentChannelId] = useState("");
  const [togglerPopUp, setTogglerPopUp] = useState(false);
  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const currentChannel = useSelector(state => state.channels.currentChannel)
  const messages = useSelector((state) =>
    selectMessagesByChannelId(state, currentChannelId)
  );
  // const channels = useSelector(state => selectAllChannels(state))
  // const channelsNames = channels.map(item => item.name)
  console.log("currentChannel", currentChannel);
  console.log("currentChannelId", currentChannelId);
  // console.log('channels mainPage', channels);
  // console.log('channelsNames mainPage', channelsNames);


  useEffect(() => {
    const handleMessage = (message) => {
      const channelId = message.channelId; // предположим, что сообщение содержит идентификатор канала
      console.log("currentMEssage", message);
      dispatch(addMessager({ channelId, message }));
    };

    socket.on("newMessage", handleMessage);

    const getChannels = async (token) => {
      try {
        const response = await axios.get("/api/v1/channels", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       dispatch(setConcurrentChannel(response.data[0].name));
        dispatch(setConcurrentChannelId(response.data[0].id));  // стартовый канал и стартовый id
        dispatch(addChannels(response.data));
        console.log("getChannels", response.data);
      } catch (error) {
        console.error("Failed to fetch channels:", error);
      }
    };
    getChannels(localStorage.getItem("token"));
  }, [dispatch, socket]);

  const handleChannelClick = (channel) => {
    console.log("handleChannelClick", channel); 
    // dispatch(setCurrentChannel(channel.name));
    // setCurrentChannelId(channel.id);
    dispatch(setConcurrentChannel(channel.name));
    dispatch(setConcurrentChannelId(channel.id));
  };

  const handleMessageSubmit = async (values, { setSubmitting, resetForm }) => {
    const newMessage = {
      id: _.uniqueId(),
      value: values.message,
      channelId: currentChannelId,
      username: localStorage.getItem("username"),
    };

    console.log("на сабмите", newMessage);
    try {
      await axios.post("/api/v1/messages", newMessage, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <>
      {togglerPopUp ? <ChatPopUp proper={setTogglerPopUp} /> : null}
      <ChatContainer>
        <Header />
        <ChatBody>
          <Channels handler={handleChannelClick} toggler={setTogglerPopUp} />
          <ChatInfo currentChannel={currentChannel} messages={messages} />
          <MessageBox messages={messages} />
          <MessageForm handlerMessage={handleMessageSubmit} />
        </ChatBody>
      </ChatContainer>
    </>
  );
};

export default MainPage;
