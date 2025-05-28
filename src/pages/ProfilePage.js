import {Button} from "@mui/material"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../context/AuthContext"
import {useTheme} from "../context/ThemeContext"

function ProfilePage() {
  const {mode, toggleTheme} = useTheme()
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
      <Button color="inherit" onClick={toggleTheme}>
        {mode === "dark" ? "Dark Mode" : "Light Mode"}
      </Button>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  )
}

export default ProfilePage
