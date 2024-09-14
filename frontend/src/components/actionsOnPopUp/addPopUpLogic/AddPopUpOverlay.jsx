import styles from '@styles/AddPopUp.module.scss';

const AddPopUpOverlay = ({ onClick }) => (
  <button
    type="button"
    aria-label="close_button"
    onClick={onClick}
    className={styles.popUp_overlay}
  />
);

export default AddPopUpOverlay;
