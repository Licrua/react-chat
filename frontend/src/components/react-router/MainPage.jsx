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
import { useEffect } from "react";
import { addChannels, addMessage } from "./redux/loginSlice";
import { Form, Formik, Field } from "formik";

const MainPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const users = useSelector((state) => state.login.users);
  const channels = useSelector((state) => state.login.channels);
  const messages = useSelector((state) => state.login.messages);
  const dispatch = useDispatch();


  useEffect(() => {
    async function getChannels(token) {
      const channels = await axios.get("/api/v1/channels", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addChannels(channels.data));
    }
    async function getMessage(token) {
      const message = await axios.get("/api/v1/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addMessage(message.data));
    }
    getChannels(localStorage.getItem("token"));
    getMessage(localStorage.getItem("token"));
  }, [dispatch]);

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
                channels.map((item) => (
                  <li key={item.id}>
                    <button>{item.name}</button>
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.chat_channel_info}>
            <b>{messages.length > 1 && messages.name}# сообщения</b>
            <p>{messages.length - 1} сообщение</p>
          </div>
          <div className={styles.chat_message_form}>
            <Formik
              initialValues={{
                message: "",
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
