import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownMenu,
  Stack,
} from 'react-bootstrap';
import styles from '@styles/css/Channels.module.css';
import {
  selectAllChannels,
  setConcurrentChannelId,
} from '@slices/channelsSlice';
import RemovePopUp from '@components/additionalActionsOnPopUp/RemovePopUp';
import RenamePopUp from '@components/additionalActionsOnPopUp/RenamePopUp';
import AddPopUp from '@components/additionalActionsOnPopUp/AddPopUp';

const Channels = ({ handleChannelClick }) => {
  const channels = useSelector(selectAllChannels);
  const [toggleId, setToggleId] = useState(null);
  const [removeToggler, setRemoveToggler] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [renameToggler, setRenameToggler] = useState(false);
  const [isPopupToggle, setIsPopupToggle] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scrollingRef = useRef();

  useEffect(() => {
    scrollingRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [channels]);

  // eslint-disable-next-line no-unused-vars
  const handleToggle = (e, id) => {
    console.log(e.target.tagName);
    setToggleId(toggleId === id ? null : id);
    console.log('toggleId', toggleId);
    console.log('id', id);
    dispatch(setConcurrentChannelId(id));
  };

  window.addEventListener('click', (e) => {
    console.log('windows events', e.target.tagName);
    if (e.target.tagName !== 'BUTTON') {
      console.log('toggleIDDDDD', toggleId);
      setToggleId(false);
    }
  });

  const renameHandler = () => {
    setRenameToggler((prevState) => !prevState);
    // editChannel(id, localStorage.getItem("token"), value);
  };

  function handlerPassage(id) {
    setCurrentId(id);
    setRemoveToggler(true);
  }

  // const handler = (e) => {
  //   console.log('main div', e.target.tagName);
  //   if (e.target.tagName !== 'BUTTON') {
  //     setToggleId(false);
  //   }
  // };
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
        <ul
          className={`p-3 nav nav-pills nav-fill overflowY-auto ${styles.chat_list}`}
        >
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
                  onClick={() => handleChannelClick(item)}
                  className="d-flex flex-shrink-0 rounded-0"
                >
                  {item.name.length >= 8
                    ? `# ${item.name.slice(0, 8) + '.'.repeat(3)}`
                    : `# ${item.name}`}
                </Button>
                {item.removable && (
                  <Dropdown.Toggle
                    split
                    variant="secondary"
                    id={`dropdown-split-${item.id}`}
                    onClick={(e) => handleToggle(e, item.id)}
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
            <div ref={scrollingRef} />
          </Stack>
        </ul>
      </div>
    </>
  );
};
export default Channels;
