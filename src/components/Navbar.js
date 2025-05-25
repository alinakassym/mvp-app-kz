import {Link} from "react-router-dom"
import {useAuth} from "../context/AuthContext"

function Navbar() {
  const {user, logout} = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav style={{padding: "10px", borderBottom: "1px solid #ccc"}}>
      <Link to="/" style={{marginRight: "10px"}}>
        Главная
      </Link>
      {user ? (
        <>
          <Link to="/profile" style={{marginRight: "10px"}}>
            Профиль
          </Link>
          <button onClick={handleLogout}>Выйти</button>
        </>
      ) : (
        <Link to="/login">Войти</Link>
      )}
    </nav>
  )
}

export default Navbar
