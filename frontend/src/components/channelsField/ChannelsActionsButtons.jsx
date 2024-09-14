// import { useTranslation } from 'react-i18next';
// import { Button, ButtonGroup, Dropdown, DropdownMenu } from 'react-bootstrap';

// const ChannelsActionsButtons = ({
//   item,
//   handleChannelClick,
//   //   handleToggle,
//   renameHandler,
//   handlerPassage,
// }) => {
//   const { t } = useTranslation();
//   //   console.log('handleToggler', handleToggle);

//   return (
//     <Dropdown as={ButtonGroup} key={item.id} show={item.toggleId === item.id}>
//       <Button
//         variant="secondary"
//         type="button"
//         onClick={() => handleChannelClick(item)}
//         className="d-flex flex-shrink-0 rounded-0"
//       >
//         {item.name.length >= 8
//           ? `# ${item.name.slice(0, 8)}...`
//           : `# ${item.name}`}
//       </Button>
//       {item.removable && (
//         <Dropdown.Toggle
//           split
//           variant="secondary"
//           id={`dropdown-split-${item.id}`}
//           onClick={() => console.log('нажимаю')}

//           //   onClick={(e) => handleToggle(e, item.id)}
//         >
//           <span className="visually-hidden">{t('Upkeep of channel')}</span>
//         </Dropdown.Toggle>
//       )}
//       <DropdownMenu>
//         <Dropdown.Item
//           onClick={() => handlerPassage(item.id)}
//           href="#/action-1"
//         >
//           {t('delete')}
//         </Dropdown.Item>
//         <Dropdown.Item onClick={renameHandler} href="#/action-2">
//           {t('rename')}
//         </Dropdown.Item>
//       </DropdownMenu>
//     </Dropdown>
//   );
// };

// export default ChannelsActionsButtons;
