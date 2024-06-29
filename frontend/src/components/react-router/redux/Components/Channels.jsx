import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import styles from '../css/Channels.module.css';
import { selectAllChannels, setConcurrentChannelId } from '../channelsSlice';
import RemovePopUp from './RemovePopUp';
import RenamePopUp from './RenamePopUp';
import AddPopUp from './AddPopUp';

const Channels = ({ handler }) => {
  const channels = useSelector(selectAllChannels);
  const [toggleId, setToggleId] = useState(null);
  const [removeToggler, setRemoveToggler] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [renameToggler, setRenameToggler] = useState(false);
  const [isPopupToggle, setIsPopupToggle] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleToggle = (id) => {
    setToggleId(toggleId === id ? null : id);
    dispatch(setConcurrentChannelId(id));
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
      <ToastContainer />
      {isPopupToggle ? <AddPopUp setIsPopupToggle={setIsPopupToggle} /> : null}
      {renameToggler ? (
        <RenamePopUp setRenameToggler={setRenameToggler} />
      ) : null}
      {removeToggler ? (
        <RemovePopUp
          setRemoveToggler={setRemoveToggler}
          currentId={currentId}
        />
      ) : null}
      <div className={styles.chat_channels}>
        <p style={{ margin: '0px' }}>{t('channels')}</p>
        <button
          aria-label="add_button"
          type="button"
          className={styles.add_anchor}
          onClick={() => {
            setIsPopupToggle(true);
          }}
        />
        <ul className="chat_channels_list">
          {channels.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={styles.channels_button}
                onClick={() => handler(item)}
              >
                #{item.name}
              </button>
              {item.removable && (
                <button
                  aria-label="toggle"
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  className={styles.channels_second_button}
                />
              )}
              {toggleId === item.id ? (
                <div className={styles.channels_radio}>
                  <button
                    aria-label="delete"
                    type="button"
                    className={styles.delete_anchor}
                    onClick={() => handlerPassage(item.id)}
                  >
                    {t('delete')}
                  </button>
                  <button
                    aria-label="rename"
                    type="button"
                    className={styles.rename_anchor}
                    onClick={renameHandler}
                  >
                    {t('rename')}
                  </button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Channels;
