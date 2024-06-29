import React from 'react';
import styles from '../css/ChatBody.module.css';

const ChatBody = ({ children }) => {
  return <div className={styles.chat_body}>{children}</div>;
};
export default ChatBody;
