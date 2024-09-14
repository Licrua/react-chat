import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '@utils/webSocket';
import { removeSomeChannel, setConcurrentChannel } from '@slices/channelsSlice';
import { setRemoveToggler } from '@slices/popUpSlice';
import {
  errorOnRequest,
  successfullyDeletedChannel,
} from '@utils/toast/notify';
import styles from '@styles/RemovePopUp.module.scss';
import { removeChannel } from '@utils/request';
// import RemovePopUpOverlay from './RemovePopUpOverlay';
import RemovePopUpHeader from './RemovePopUpHeader';
import RemovePopUpButtons from './RemovePopUpButtons';

const RemovePopUpContainer = () => {
  const currentId = useSelector((state) => state.popUp.currentId);
  const ref = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      try {
        socket.on('removeChannel', (payload) => {
          dispatch(removeSomeChannel(payload.id));
        });
      } catch (e) {
        errorOnRequest();
      }
    }
  }, [dispatch]);

  const handleRemove = (e, id) => {
    e.preventDefault();
    removeChannel(id, localStorage.getItem('token'));
    ref.current.style.display = 'none';
    dispatch(setConcurrentChannel('general'));
    dispatch(setRemoveToggler(false));
    successfullyDeletedChannel();
  };

  const closeWindow = () => {
    dispatch(setRemoveToggler(false));
  };

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRemove(e, currentId);
      dispatch(setRemoveToggler(false));
    }
  };

  return (
    <div ref={ref} className={styles.removePopUp_container}>
      <RemovePopUpHeader closeWindow={closeWindow} />
      <RemovePopUpButtons
        closeWindow={closeWindow}
        handleRemove={handleRemove}
        currentId={currentId}
        keyDownHandler={keyDownHandler}
      />
    </div>
  );
};

export default RemovePopUpContainer;
