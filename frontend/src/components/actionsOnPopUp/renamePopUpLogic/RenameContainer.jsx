import styles from '@styles/RenamePopUp.module.scss';

const RenameContainer = ({ children }) => {
  return <div className={styles.renamePopUp_container}>{children}</div>;
};

export default RenameContainer;
