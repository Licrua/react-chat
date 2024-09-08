import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import socket from '@utils/webSocket';
import { removeChannel } from '@utils/request';
import { removeSomeChannel, setConcurrentChannel } from '@slices/channelsSlice';
import {
  successfullyDeletedChannel,
  errorOnRequest,
} from '@utils/toast/notify';
import styles from '@styles/css/RemovePopUp.module.scss';
import { CloseButton } from 'react-bootstrap';

const RemovePopUp = ({ currentId, setRemoveToggler }) => {
  const ref = useRef(null);
  const isPopClosed = false;
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
    setRemoveToggler(false);
    successfullyDeletedChannel();
  };

  const closeWindow = () => {
    setRemoveToggler(false);
  };

  const keyDownHandler = (e) => {
    if (e.key === 'enter') {
      e.preventDefault();
      handleRemove(e, currentId);
      setRemoveToggler(false);
    }
  };

  return (
    <div
      ref={ref}
      className={isPopClosed ? `${styles.removePopUp_cointainer}` : null}
    >
      <div className={styles.removePopUp_overlay} />
      <div ref={ref} className={styles.removePopUp_container}>
        <h4 className="mb-4">{t('delete')}</h4>
        <hr className={styles.line} />
        <p>{t('areYouSure')}</p>
        <CloseButton
          aria-label="Hide"
          className="position-absolute top-0 end-0"
          onClick={closeWindow}
        />
        <div style={styles.buttons}>
          <button
            type="button"
            tabIndex="0"
            onClick={closeWindow}
            aria-label="cancel_button"
            className={styles.cancel_button}
          >
            {t('cancel')}
          </button>
          <button
            type="button"
            tabIndex="0"
            onKeyDown={(e) => keyDownHandler(e, currentId)}
            onClick={(e) => handleRemove(e, currentId)}
            className={styles.delete_button}
          >
            {t('delete')}
          </button>
        </div>
      </div>
    </div>
  );
};
export default RemovePopUp;
