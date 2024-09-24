// CombinedPopUp.jsx
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseButton } from 'react-bootstrap';
import {
  setAddToggler,
  setRemoveToggler,
  setRenameToggler,
} from '@slices/popUpSlice';
import {
  addChannel,
  removeSomeChannel,
  editSomeChannel,
  selectAllChannels,
  setConcurrentChannel,
} from '@slices/channelsSlice';
import { removeChannel } from '@utils/channelsFunction/removeChannel';
import socket from '@utils/webSocket';
import {
  successfullyDeletedChannel,
  errorOnRequest,
} from '@utils/toast/notify';
import styles from '@styles/CombinedPopUp.module.scss';
import usePopup from 'hooks/usePopup';
import PopUpOverlay from './PopUpOverlay';

const CombinedPopUp = () => {
  const dispatch = useDispatch();
  const popupState = useSelector((state) => state.popUp);

  const closePopupHandlers = {
    add: () => dispatch(setAddToggler(false)),
    remove: () => dispatch(setRemoveToggler(false)),
    rename: () => dispatch(setRenameToggler(false)),
  };

  const isOverlayShown =
    popupState.addToggler ||
    popupState.removeToggler ||
    popupState.renameToggler;

  useEffect(() => {
    if (socket) {
      try {
        socket.on('newChannel', (payload) => dispatch(addChannel(payload)));
        socket.on('removeChannel', (payload) =>
          dispatch(removeSomeChannel(payload.id)),
        );
        socket.on('renameChannel', (payload) =>
          dispatch(
            editSomeChannel({
              id: payload.id,
              changes: { name: payload.name },
            }),
          ),
        );
      } catch (e) {
        errorOnRequest();
      }
    }

    return () => {
      if (socket) {
        socket.off('newChannel');
        socket.off('removeChannel');
        socket.off('renameChannel');
      }
    };
  }, [dispatch]);

  const popUps = usePopup();

  return (
    <>
      {isOverlayShown && <PopUpOverlay />}

      {/* Map over popUps to render each modal */}
      {popUps.map(({ id, title, condition, renderContent }) =>
        condition ? (
          <div key={id} className={styles.popUp_container}>
            <CloseButton
              className={styles.close_button}
              onClick={closePopupHandlers[id]}
            />
            <h4 className={styles.title}>{title}</h4>
            {renderContent()}
          </div>
        ) : null,
      )}
    </>
  );
};

export default CombinedPopUp;
