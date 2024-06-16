import styles from '../css/ChatInfo.module.css'


function ChatInfo({currentChannel, messages}) {
    return  (
        <div className={styles.chat_channel_info}>
          <b>#{currentChannel}</b>
          <p>{messages.length} сообщений</p>
        </div>
    )
}
export default ChatInfo


