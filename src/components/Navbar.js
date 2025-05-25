import {AppBar, Toolbar, Typography, Button} from "@mui/material"
import {Link} from "react-router-dom"
import {useAuth} from "../context/AuthContext"

function Navbar() {
  const {user, logout} = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          <Link to="/" style={{color: "inherit", textDecoration: "none"}}>
            Казахский язык
          </Link>
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/profile">
              Профиль
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Выйти
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Войти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
