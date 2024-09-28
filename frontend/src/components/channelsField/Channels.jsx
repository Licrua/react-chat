// /* eslint-disable no-param-reassign */
// import { useDispatch, useSelector } from 'react-redux';
// import React, { useEffect, useRef, useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
// import {
//   Button,
//   ButtonGroup,
//   Dropdown,
//   DropdownMenu,
//   Stack,
// } from 'react-bootstrap';
// import styles from '@styles/Channels.module.scss';
// import {
//   selectAllChannels,
//   setCurrentChannelId,
// } from '@slices/channelsSlice';
// import { useImmer } from 'use-immer';
// import PopupManager from './PopUpManager';
// import AddButton from './AddButton';

// const Channels = ({ handleChannelClick }) => {
//   const channels = useSelector(selectAllChannels);

//   console.log('channels', channels);

//   const [popupState, setPopupState] = useImmer({
//     toggleId: null,
//     removeToggler: false,
//     renameToggler: false,
//     currentId: null,
//     AddToggler: false,
//   });
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const scrollingRef = useRef();

//   // Автоскролл к последнему каналу
//   useEffect(() => {
//     scrollingRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [channels]);

//   // Обработка переключения дропдауна
//   const handleToggle = useCallback(
//     (_, id) => {
//       setPopupState((draft) => {
//         draft.toggleId = draft.toggleId === id ? null : id;
//       });
//       console.log('я сработал канал');

//       dispatch(setCurrentChannelId(id));
//     },
//     [dispatch],
//   );

//   // Обработка переименования
//   const renameHandler = () => {
//     setPopupState((draft) => {
//       draft.renameToggler = !draft.renameToggler;
//     });
//   };

//   // Обработка удаления
//   const handlerPassage = (id) => {
//     setPopupState((draft) => {
//       draft.currentId = id;
//       draft.removeToggler = true;
//     });
//   };

//   return (
//     <>
//       <PopupManager popupState={popupState} setPopupState={setPopupState} />
//       <div className={styles.chat_channels}>
//         <p style={{ margin: '0px' }}>{t('channels')}</p>
//         <AddButton
//           setAddToggler={(val) =>
//             setPopupState((draft) => {
//               draft.AddToggler = val;
//             })
//           }
//         />
//         <ul
//           className={`p-3 nav nav-pills nav-fill overflowY-auto ${styles.chat_list}`}
//         >
//           <Stack gap={2}>
//             {channels.map((item) => (
//               <Dropdown
//                 as={ButtonGroup}
//                 key={item.id}
//                 show={popupState.toggleId === item.id}
//               >
//                 <Button
//                   variant="secondary"
//                   type="button"
//                   onClick={() => handleChannelClick(item)}
//                   className="d-flex flex-shrink-0 rounded-0"
//                 >
//                   {item.name.length >= 8
//                     ? `# ${item.name.slice(0, 8)}...`
//                     : `# ${item.name}`}
//                 </Button>
//                 {item.removable && (
//                   <Dropdown.Toggle
//                     split
//                     variant="secondary"
//                     id={`dropdown-split-${item.id}`}
//                     onClick={(e) => handleToggle(e, item.id)}
//                   >
//                     <span className="visually-hidden">Upkeep of channel</span>
//                   </Dropdown.Toggle>
//                 )}
//                 <DropdownMenu>
//                   <Dropdown.Item
//                     onClick={() => handlerPassage(item.id)}
//                     href="#/action-1"
//                   >
//                     {t('delete')}
//                   </Dropdown.Item>
//                   <Dropdown.Item onClick={renameHandler} href="#/action-2">
//                     {t('rename')}
//                   </Dropdown.Item>
//                 </DropdownMenu>
//               </Dropdown>
//             ))}
//             <div ref={scrollingRef} />
//           </Stack>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Channels;

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  ButtonGroup,
  Dropdown,
  SplitButton,
  Stack,
} from 'react-bootstrap';
import styles from '@styles/Channels.module.scss';
import {
  selectAllChannels,
  setCurrentChannel,
  setCurrentChannelId,
} from '@slices/channelsSlice';
import {
  setToggleId,
  setRemoveToggler,
  setRenameToggler,
  setCurrentId,
} from '@slices/popUpSlice';
import AddButton from './AddButton';
import CombinedPopUp from '../popUpLogic/CombinedPopUp';
import ChannelDropdowns from './ChannelDropdowns';
import ChannelButtons from './ChannelButtons';

const Channels = () => {
  const channels = useSelector(selectAllChannels);
  //   const popupState = useSelector((state) => state.popUp);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scrollingRef = useRef();

  // Автоскролл к последнему каналу
  useEffect(() => {
    scrollingRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [channels]);

  //   const handleChannelClick = (channel) => {
  //     dispatch(setCurrentChannel(channel.name));
  //     dispatch(setCurrentChannelId(channel.id));
  //   };

  //   // Обработка переключения дропдауна
  //   const handleToggle = (_, id) => {
  //     dispatch(setToggleId(id));
  //     dispatch(setCurrentChannelId(id));
  //   };

  //   // Обработка переименования
  //   const renameHandler = () => {
  //     dispatch(setRenameToggler(!popupState.renameToggler));
  //   };

  //   // Обработка удаления
  //   const deleteHandler = (id) => {
  //     console.log('я срабатываю');
  //     dispatch(setCurrentId(id));
  //     dispatch(setRemoveToggler(!popupState.removeToggler));
  //   };

  return (
    <>
      <CombinedPopUp />
      <div className={styles.chat_channels}>
        <p>
          {t('channels')}
          <span className="ms-3">{'\u2295'}</span>
        </p>
        {/* <AddButton /> */}
        <ul
          className={`p-1 nav nav-pills nav-fill overflowY-auto ${styles.chat_list}`}
        >
          <Stack gap={2}>
            {channels.map((item) =>
              item.removable ? (
                <ChannelDropdowns key={item.id} item={item} />
              ) : (
                <ChannelButtons item={item} key={item.id} />
              ),
            )}
            <div ref={scrollingRef} />
          </Stack>
        </ul>
      </div>
    </>
  );
};

export default Channels;
