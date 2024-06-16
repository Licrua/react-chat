    import styles from '../css/ChatBody.module.css'

    function ChatBody({children}) {
        return (
            <div className={styles.chat_body}>
                {children}
            </div>
        )
    }
    export default ChatBody