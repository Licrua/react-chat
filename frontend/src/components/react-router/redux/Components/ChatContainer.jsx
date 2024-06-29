import styles from '../css/ChatContainer.module.css';

const ChatContainer = ({ children }) => {
  return <div className={styles.chat_container}>{children}</div>;
};
export default ChatContainer;
