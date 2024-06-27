import styles from "../css/Channels.module.css";
import { selectAllChannels, removeSomeChannel } from "../channelsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import RemovePopUp from "../Components/RemovePopUp";
import RenamePopUp from "../Components/RenamePopUp";
import { setConcurrentChannelId } from "../channelsSlice";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import AddPopUp from "./AddPopUp";

function Channels({ handler, toggler }) {
  const channels = useSelector(selectAllChannels);
  const [toggleId, setToggleId] = useState(null);
  const [removeToggler, setRemoveToggler] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [renameToggler, setRenameToggler] = useState(false);
  const [isPopupToggle, setIsPopupToggle] = useState(false);
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const ref = useRef()
  // const unremovableChannels = channels.filter((item) => !item.removable);



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
        <ToastContainer/>
       {isPopupToggle ? <AddPopUp  setIsPopupToggle={setIsPopupToggle} /> : null}
      {renameToggler ? <RenamePopUp  setRenameToggler={setRenameToggler} /> : null}
      {removeToggler ? <RemovePopUp setRemoveToggler={setRemoveToggler} currentId={currentId} /> : null}
      <div className={styles.chat_channels}>
        <p style={{margin: '0px'}}>{t('channels')}
          </p>
          <a 
            className={styles.add_anchor}
            onClick={() => {
              console.log('нажата');
              setIsPopupToggle(true)}}
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
              {toggleId === item.id ? (
                <div className={styles.channels_radio}>
                  <a className={styles.delete_anchor} onClick={() => handlerPassage(item.id)} >
                    {t('delete')}
                  </a>
                  <a className={styles.rename_anchor} onClick={renameHandler} >
                    {t('rename')}
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
