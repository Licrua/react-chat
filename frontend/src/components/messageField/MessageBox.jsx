import { useEffect, useRef } from 'react';
import styles from '@styles/MessageBox.module.scss';

const MessageBox = ({ messages }) => {
  const endRef = useRef();
  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  console.log('messagesSSSSS', messages);
  //   const usersArray = JSON.parse(localStorage.getItem('username'));
  //   console.log('usersArray', usersArray);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.chat_message_box}>
      {messages.map((item) => (
        <div className="text-nowrap mb-2" key={item.id}>
          <b>{item.username}:</b>
          <em className="p-1">{item.value}</em>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};
export default MessageBox;
