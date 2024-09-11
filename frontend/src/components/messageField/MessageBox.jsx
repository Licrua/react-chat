import { useEffect, useRef } from 'react';
import styles from '@styles/MessageBox.module.scss';

const MessageBox = ({ messages }) => {
  const endRef = useRef();
  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.chat_message_box}>
      {messages.map((item) => (
        <div className="text-break mb-2" key={item.id}>
          <b>{item.username}</b> {item.value}
        </div>
      ))}
      <div className="messageEndRef" ref={endRef} />
    </div>
  );
};
export default MessageBox;
