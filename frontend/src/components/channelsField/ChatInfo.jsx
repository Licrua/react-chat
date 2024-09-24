import { useTranslation } from 'react-i18next';
import styles from '@styles/ChatInfo.module.scss';
import { useSelector } from 'react-redux';

const ChatInfo = ({ messages }) => {
  const { t } = useTranslation();
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  return (
    <div className={styles.chat_channel_info}>
      <b># {currentChannel}</b>
      <p>{t('messages.counter.count', { count: messages.length })}</p>
    </div>
  );
};
export default ChatInfo;
