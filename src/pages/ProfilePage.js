import {Button} from "@mui/material"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../context/AuthContext"
import {useTheme} from "../context/ThemeContext"
import Typography from "@mui/material/Typography"
import "./ProfilePage.css"

function ProfilePage() {
  const {mode, toggleTheme, palette} = useTheme()
  const {user, logout} = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()

    navigate("/login")
  }

  return (
    <div className="page-container">
      <div
        className="page-header"
        style={{backgroundColor: palette.background.paper}}
      >
        <Typography variant="h6" gutterBottom>
          Профиль
        </Typography>
      </div>
      <div className="page-content-wrapper">
        <p>Email: {user?.email}</p>
        <Button color="inherit" onClick={toggleTheme}>
          {mode === "dark" ? "Dark Mode" : "Light Mode"}
        </Button>
        <button onClick={handleLogout}>Выйти</button>
      </div>
    </div>
  )
}

export default ProfilePage
