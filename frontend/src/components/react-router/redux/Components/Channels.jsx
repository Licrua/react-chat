import styles from "../css/Channels.module.css";
import { selectAllChannels, removeSomeChannel } from "../channelsSlice";
import { removeChannel, editChannel } from "../../request";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import RemovePopUp from "../Components/RemovePopUp";
import RenamePopUp from "../Components/RenamePopUp";
import { setConcurrentChannelId } from "../channelsSlice";

function Channels({ handler, toggler }) {
  const channels = useSelector(selectAllChannels);
  const [toggleId, setToggleId] = useState(null);
  const [removeToggler, setRemoveToggler] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [renameToggler, setRenameToggler] = useState(false);
  const dispatch = useDispatch();
  const unremovableChannels = channels.filter((item) => !item.removable);

  console.log("unremovableChannels", unremovableChannels);
  console.log("channels Channels", channels);

  const handleToggle = (id) => {
    setToggleId(toggleId === id ? null : id);
    dispatch(setConcurrentChannelId(id))
  };

  const renameHandler = () => {
    setRenameToggler((prevState) => !prevState);
    // editChannel(id, localStorage.getItem("token"), value);
  };

  function handlerPassage(id) {
    setCurrentId(id);
    setRemoveToggler(true); 
  }
  return (
    <>
      {renameToggler ? <RenamePopUp  setRenameToggler={setRenameToggler} /> : null}
      {removeToggler ? <RemovePopUp setRemoveToggler={setRemoveToggler} currentId={currentId} /> : null}
      <div className={styles.chat_channels}>
        <p style={{margin: '0px'}}>Каналы
          </p>
          <a 
            className={styles.add_anchor}
            onClick={() => toggler(true)}
          />
        <ul className="chat_channels_list">
          {channels.map((item) => (
            <li key={item.id}>
              <button
                className={styles.channels_button}
                onClick={() => handler(item)}
              >
                {"#"}
                {item.name}
              </button>
              {item.removable && (
                <button
                  onClick={() => handleToggle(item.id)}
                  className={styles.channels_second_button}
                ></button>
              )}
              {/* radioPopUp */}
              {toggleId === item.id ? (
                <div className={styles.channels_radio}>
                  <a className={styles.delete_anchor} onClick={() => handlerPassage(item.id)} href="#">
                    Удалить
                  </a>
                  <a className={styles.rename_anchor} onClick={() => renameHandler()} href="#">
                    Переименовать
                  </a>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default Channels;
