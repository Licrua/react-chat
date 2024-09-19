import styles from '@styles/Channels.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setAddToggler } from '@slices/popUpSlice';

const AddButton = () => {
  const dispatch = useDispatch();
  const setAddTOggler = useSelector((state) => state.popUp);
  console.log('setAddTOggler', setAddTOggler);

  return (
    <button
      aria-label="add_button"
      type="button"
      className={styles.add_anchor}
      onClick={() => dispatch(setAddToggler(true))}
    >
      <span className="visually-hidden">+</span>
    </button>
  );
};
export default AddButton;
