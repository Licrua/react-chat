import styles from '../css/ChatContainer.module.css'

function ChatContainer({children}) {
    return (
        <div className={styles.chat_container}>
            {children}
        </div>
    )
}
export default ChatContainer