import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownMenu,
  Stack,
} from 'react-bootstrap';
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

  // eslint-disable-next-line no-unused-vars
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
        <ul className={styles.channels_list}>
          <Stack gap={2}>
            {channels.map((item) => (
              <Dropdown
                as={ButtonGroup}
                key={item.id}
                show={toggleId === item.id}
              >
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => handler(item)}
                >
                  #{item.name}
                </Button>
                {item.removable && (
                  <Dropdown.Toggle
                    split
                    variant="secondary"
                    id={`dropdown-split-${item.id}`}
                    onClick={() => handleToggle(item.id)}
                  />
                )}
                <DropdownMenu>
                  <Dropdown.Item
                    onClick={() => handlerPassage(item.id)}
                    href="#/action-1"
                  >
                    {t('delete')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={renameHandler} href="#/action-2">
                    {t('rename')}
                  </Dropdown.Item>
                </DropdownMenu>
              </Dropdown>
            ))}
          </Stack>
        </ul>
      </div>
    </>
  );
};
export default Channels;
