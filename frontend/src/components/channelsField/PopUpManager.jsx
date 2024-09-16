/* eslint-disable no-param-reassign */
import AddPopUp from '@components/actionsOnPopUp/addPopUpLogic/AddPopUp';
import RenamePopUp from '@components/actionsOnPopUp/renamePopUpLogic/RenamePopUp';
import RemovePopUp from '@components/actionsOnPopUp/removePopUpLogic/RemovePopUp';
import { useSelector } from 'react-redux';

const PopUpManager = () => {
  const popupState = useSelector((state) => state.popUp);
  console.log('popupStateEEEEE', popupState);

  return (
    <>
      {popupState.isPopupToggle && <AddPopUp />}
      {popupState.renameToggler && <RenamePopUp />}
      {popupState.removeToggler && <RemovePopUp />}
    </>
  );
};

export default PopUpManager;
