import styles from '@styles/RemovePopUp.module.scss';
import { useRef } from 'react';

const RemovePopUpContainer = ({ children }) => {
  const ref = useRef(null);
  return (
    <div ref={ref} className={styles.removePopUp_container}>
      {children}
    </div>
  );
};

export default RemovePopUpContainer;
