import styles from '@styles/Channels.module.scss';

const AddButton = ({ setIsPopupToggle }) => (
  <button
    aria-label="add_button"
    type="button"
    className={styles.add_anchor}
    onClick={() => setIsPopupToggle(true)}
  >
    <span className="visually-hidden">+</span>
  </button>
);
export default AddButton;
