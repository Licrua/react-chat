import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from '../css/RemovePopUp.module.css';
import { removeChannel } from '../../request';
import { removeSomeChannel, setConcurrentChannel } from '../channelsSlice';
import {
  successfullyDeletedChannel,
  errorOnRequest,
} from '../../../../toast/notify';
import socket from '../../webSocket';

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

  function cancelHandler() {
    // setisCanceled(prevResult => !prevResult)
    setRemoveToggler(false);
  }

  const keyDownHandler = (e) => {
    // убрал currentId
    if (e.key === 'enter') {
      console.log('key', e.key);
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
        <h4>{t('delete')}</h4>
        <hr />
        <p>{t('areYouSure')}</p>
        <div style={styles.buttons}>
          <button
            aria-label="close_button"
            type="button"
            tabIndex="0"
            onClick={cancelHandler}
            className={styles.close_anchor}
          />
          <button
            type="button"
            tabIndex="0"
            onClick={cancelHandler}
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
