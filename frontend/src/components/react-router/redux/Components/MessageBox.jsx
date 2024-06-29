import styles from '../css/MessageBox.module.css';

const MessageBox = ({ messages }) => {
  return (
    <div className={styles.chat_message_box}>
      {messages.map((item) => (
        <div key={item.id}>
          <b>{item.username}</b> {item.value}
        </div>
      ))}
    </div>
  );
};
export default MessageBox;
