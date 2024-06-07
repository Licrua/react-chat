import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import styles from "./css/MainPage.module.css";
import icon from "../react-router/icon.svg";
import { useEffect, useState } from "react";
import { addChannels, addMessager } from "./redux/loginSlice";
import { Form, Formik, Field } from "formik";
import _ from "lodash";
import socket from "./webSocket";
import { addMessage } from "./request";

const MainPage = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  // const users = useSelector((state) => state.login.users);
  const channels = useSelector((state) => state.login.channels);
  const messages = useSelector((state) => state.login.messages);
  const dispatch = useDispatch();
  const [currentChannel, setCurrentChannel] = useState(null);
  const [currentChannelId, setCurrentChannelId] = useState("");
  console.log("messages", messages);

  useEffect(() => {
    async function getChannels(token) {
      const response = await axios.get("/api/v1/channels", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('response', response.data[0].name);
    setCurrentChannel(response.data[0].name)
      console.log("channels", channels);
      dispatch(addChannels(response.data));
    }

    getChannels(localStorage.getItem("token"));
  }, [dispatch]);

  const handleChannelClick = (channelName) => {
    setCurrentChannel(channelName.name);
    setCurrentChannelId(channelName.id);
    console.log(localStorage.getItem("username"));
    console.log("currentChannel", currentChannel);
    console.log("currentChannelId", currentChannelId);
  };

  return (
    <>
      <div className={styles.chat_container}>
        <div className={styles.chat_header}>
          <p
            style={{
              fontSize: "20px",
              margin: "10px 10px",
              fontFamily: "cursive",
            }}
          >
            Ilya Chat
          </p>
          <p>Добро пожаловать {localStorage.getItem("username")}</p>
          <button
            style={{ backgroundColor: "white", padding: "5px", margin: "5px" }}
          >
            <Link to={"/login"}>Выйти</Link>
          </button>
        </div>
        <div className={styles.main_chat}>
          <div className={styles.chat_channels}>
            <p>Каналы</p>
            <button
              style={{ position: "absolute", top: "15px", right: "10px" }}
            >
              <img
                src={icon}
                style={{ width: "25px", overflow: "hidden" }}
                alt="icon"
              />
            </button>
            <ul className="chat_channels_list">
              {channels.length > 0 &&
                channels.map((item, id) => (
                  <li key={id}>
                    <button onClick={() => handleChannelClick(item)}>
                      {item.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.chat_channel_info}>
            <b>#{currentChannel}</b>
            <p>{messages.length} сообщение</p>
          </div>
          <div className={styles.chat_message_box}>
            {messages.map((item) => (
              <div key={item.id}>
                <b>{localStorage.getItem("username")}</b> {item.value}
              </div>
            ))}
          </div>
          <div className={styles.chat_message_form}>
            <Formik
              initialValues={{
                message: "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                values.channelId = currentChannelId;
                console.log("onSubmit message", values);
                addMessage(values, localStorage.getItem("token"));
                socket.emit("newMessage", values, (response) => {
                  console.log("response", response);
                });
                dispatch(
                  addMessager({
                    id: _.uniqueId(),
                    value: values.message,
                    channelId: currentChannelId,
                  })
                );
              }}
            >
              <Form>
                <Field
                  style={{ width: "1000px", padding: "10px" }}
                  type="text"
                  name="message"
                  placeholder="Введите информацию"
                />
                <button type="submit">V</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
