// import { useEffect, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';
// import socket from '@utils/webSocket';
// import { removeChannel } from '@utils/request';
// import { removeSomeChannel, setConcurrentChannel } from '@slices/channelsSlice';
// import {
//   successfullyDeletedChannel,
//   errorOnRequest,
// } from '@utils/toast/notify';
// import styles from '@styles/RemovePopUp.module.scss';
// import { CloseButton } from 'react-bootstrap';
// import { setRemoveToggler } from '@slices/popUpSlice';

// const RemovePopUp = ({ currentId }) => {
//   const ref = useRef(null);
//   const isPopClosed = false;
//   const dispatch = useDispatch();
//   const { t } = useTranslation();

//   useEffect(() => {
//     if (socket) {
//       try {
//         socket.on('removeChannel', (payload) => {
//           dispatch(removeSomeChannel(payload.id));
//         });
//       } catch (e) {
//         errorOnRequest();
//       }
//     }
//   }, [dispatch]);

//   const handleRemove = (e, id) => {
//     e.preventDefault();
//     removeChannel(id, localStorage.getItem('token'));
//     ref.current.style.display = 'none';
//     dispatch(setConcurrentChannel('general'));
//     dispatch(setRemoveToggler(false));
//     successfullyDeletedChannel();
//   };

//   const closeWindow = () => {
//     dispatch(setRemoveToggler(false));
//   };

//   const keyDownHandler = (e) => {
//     if (e.key === 'enter') {
//       e.preventDefault();
//       handleRemove(e, currentId);
//       dispatch(setRemoveToggler(false));
//     }
//   };

//   return (
//     <div
//       ref={ref}
//       className={isPopClosed ? `${styles.removePopUp_cointainer}` : null}
//     >
//       <div className={styles.removePopUp_overlay} />
//       <div ref={ref} className={styles.removePopUp_container}>
//         <h4 className="mb-4">{t('delete')}</h4>
//         <hr className={styles.line} />
//         <p>{t('areYouSure')}</p>
//         <CloseButton
//           aria-label="Hide"
//           className="position-absolute p-2 top-0 end-0"
//           onClick={closeWindow}
//         />
//         <div style={styles.buttons}>
//           <button
//             type="button"
//             tabIndex="0"
//             onClick={closeWindow}
//             aria-label="cancel_button"
//             className={styles.cancel_button}
//           >
//             {t('cancel')}
//           </button>
//           <button
//             type="button"
//             tabIndex="0"
//             onKeyDown={(e) => keyDownHandler(e, currentId)}
//             onClick={(e) => handleRemove(e, currentId)}
//             className={styles.delete_button}
//           >
//             {t('delete')}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default RemovePopUp;

import React, { useRef } from 'react';
import styles from '@styles/RemovePopUp.module.scss';
import { useSelector } from 'react-redux';
import RemovePopUpOverlay from './RemovePopUpOverlay';
import RemovePopUpContainer from './RemovePopUpContainer';

const RemovePopUp = () => {
  const isPopUpClosed = useSelector((state) => state.popUp.isPopupClosed);

  console.log('isPopUpClosed', isPopUpClosed);

  const ref = useRef(null);
  return (
    // currentId
    <div
      ref={ref}
      className={isPopUpClosed ? styles.removePopUp_cointainer : ''}
    >
      <RemovePopUpOverlay />
      <RemovePopUpContainer />
    </div>
  );
};
// currentId={currentId}
export default RemovePopUp;
