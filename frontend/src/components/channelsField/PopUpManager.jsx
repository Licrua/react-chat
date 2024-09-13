/* eslint-disable no-param-reassign */
import AddPopUp from '@components/additionalActionsOnPopUp/AddPopUp';
import RenamePopUp from '@components/additionalActionsOnPopUp/RenamePopUp';
import RemovePopUp from '@components/additionalActionsOnPopUp/RemovePopUp';

const PopupManager = ({ popupState, setPopupState }) => (
  <>
    {popupState.isPopupToggle && (
      <AddPopUp
        setIsPopupToggle={(val) =>
          setPopupState((draft) => {
            draft.isPopupToggle = val;
          })
        }
      />
    )}
    {popupState.renameToggler && (
      <RenamePopUp
        setRenameToggler={(val) =>
          setPopupState((draft) => {
            draft.renameToggler = val;
          })
        }
      />
    )}
    {popupState.removeToggler && (
      <RemovePopUp
        setRemoveToggler={(val) =>
          setPopupState((draft) => {
            draft.removeToggler = val;
          })
        }
        currentId={popupState.currentId}
      />
    )}
  </>
);

export default PopupManager;
