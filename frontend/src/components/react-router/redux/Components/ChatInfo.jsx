import { useTranslation } from 'react-i18next'
import styles from '../css/ChatInfo.module.css'


function ChatInfo({currentChannel, messages}) {
  const {t} = useTranslation()
    return  (
        <div className={styles.chat_channel_info}>
          <b>#{currentChannel}</b>
          <p>{messages.length} {t('messages')}</p>
        </div>
    )
}
export default ChatInfo


