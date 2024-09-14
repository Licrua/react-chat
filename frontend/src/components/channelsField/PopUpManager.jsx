/* eslint-disable no-param-reassign */
import AddPopUp from '@components/actionsOnPopUp/addPopUpLogic/AddPopUp';
import RenamePopUp from '@components/actionsOnPopUp/renamePopUpLogic/RenamePopUp';
import RemovePopUp from '@components/actionsOnPopUp/removePopUpLogic/RemovePopUp';
import { useSelector } from 'react-redux';

const PopUpManager = () => {
  const popupState = useSelector((state) => state.popUp);
  console.log('popupState', popupState);

  return (
    <>
      {popupState.isPopupToggle && (
        <AddPopUp />
        // setIsPopupToggle={(val) =>
        //   setPopupState((draft) => {
        //     draft.isPopupToggle = val;
        //   })
        // }
      )}
      {popupState.renameToggler && (
        <RenamePopUp />
        // setRenameToggler={(val) =>
        //   setPopupState((draft) => {
        //     draft.renameToggler = val;
        //   })
        // }
      )}
      {popupState.removeToggler && (
        <RemovePopUp
        // setRemoveToggler={(val) =>
        //   setPopupState((draft) => {
        //     draft.removeToggler = val;
        //   })
        // }
        //   currentId={popupState.currentId}
        />
      )}
    </>
  );
};

export default PopUpManager;
