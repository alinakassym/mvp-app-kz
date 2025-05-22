import {useNavigate} from "react-router-dom"
import {useAuth} from "../context/AuthContext"

function ProfilePage() {
  const {user, logout} = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()

    navigate("/login")
  }

  return (
    <div>
      <h2>Профиль</h2>
      <p>Email: {user?.email}</p>

      <button onClick={handleLogout}>Выйти</button>
    </div>
  )
}

export default ProfilePage
