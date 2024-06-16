
import styles from '../css/Header.module.css'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <div className={styles.chat_header}>
        <p style={{ fontSize: "20px", margin: "10px 10px", fontFamily: "cursive" }}>
          Ilya Chat
        </p>
        <p>Добро пожаловать {localStorage.getItem("username")}</p>
        <button style={{ backgroundColor: "white", padding: "5px", margin: "5px" }}>
          <Link to={"/login"}>Выйти</Link>
        </button>
      </div>
    )
}
export default Header