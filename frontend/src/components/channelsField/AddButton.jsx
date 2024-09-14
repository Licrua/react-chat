import styles from '@styles/Channels.module.scss';
import { useDispatch } from 'react-redux';
import { setIsPopupToggle } from '@slices/popUpSlice';

const AddButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      aria-label="add_button"
      type="button"
      className={styles.add_anchor}
      onClick={() => dispatch(setIsPopupToggle(true))}
    >
      <span className="visually-hidden">+</span>
    </button>
  );
};
export default AddButton;
