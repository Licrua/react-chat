import { useTranslation } from 'react-i18next';
import styles from '../css/ChatInfo.module.css';

const ChatInfo = ({ currentChannel, messages }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.chat_channel_info}>
      <b>#{currentChannel}</b>
      <p>{t('messages.counter.count', { count: messages.length })}</p>
    </div>
  );
};
export default ChatInfo;
