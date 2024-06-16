import styles from "../css/Channels.module.css";
import { selectAllChannels } from "../channelsSlice";
import { removeChannel } from "../../request";
import { useSelector } from "react-redux";
import icon from "./icon.svg";
import { useRef, useState } from "react";

function Channels({ handler, toggler }) {
  const channels = useSelector(selectAllChannels);
  const [toggleId, setToggleId] = useState(null);

  const handleToggle = (id) => {
    setToggleId(toggleId === id ? null : id);
  };

  const handleRemove = (id) => {
    removeChannel(id, localStorage.getItem('token'))
  }
  console.log("channels", channels);
  return (
    <div className={styles.chat_channels}>
      <p>Каналы</p>
      <button
        style={{
          position: "absolute",
          backgroundColor: "grey",
          top: "25px",
          left: "85px",
        }}
      >
        <img
          src={icon}
          style={{ width: "25px", overflow: "hidden" }}
          alt="icon"
          onClick={() => toggler(true)}
        />
      </button>
      <ul className="chat_channels_list">
        {channels.map((item) => (
          <li key={item.id}>
            <button
              className={styles.channels_button}
              onClick={() => handler(item)}
            >
              {"#"} {item.name}
            </button>
            <button
              onClick={() => handleToggle(item.id)}
              className={styles.channels_second_button}
            ></button>
            {/* radioPopUp */}
            {toggleId === item.id ? (
              <div className={styles.channels_radio}>
                <a onClick={() => handleRemove(item.id)} href="#">Удалить</a>
                <a href="#">Переименовать</a>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Channels;
