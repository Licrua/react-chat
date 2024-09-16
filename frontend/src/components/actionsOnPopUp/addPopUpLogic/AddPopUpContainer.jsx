import styles from '@styles/AddPopUp.module.scss';

const AddPopUpContainer = ({ children }) => {
  return (
    <div className={styles.popUp_container} id="popup_window">
      {children}
    </div>
  );
};
export default AddPopUpContainer;
