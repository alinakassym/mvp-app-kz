import React, {useState} from "react"
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material"
import {AccountCircle, ClassOutlined} from "@mui/icons-material"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../context/AuthContext"

function BottomNavigationBar() {
  const [value, setValue] = useState(0)
  const navigate = useNavigate()
  const {user} = useAuth()

  const handleNavigation = (newValue) => {
    setValue(newValue)
    if (newValue === 0) navigate("/")
    if (newValue === 1) navigate(user ? "/profile" : "/login")
  }

  return (
    <Paper sx={{position: "fixed", bottom: 0, left: 0, right: 0}} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => handleNavigation(newValue)}
      >
        <BottomNavigationAction label="Главная" icon={<ClassOutlined />} />
        <BottomNavigationAction label="Профиль" icon={<AccountCircle />} />
      </BottomNavigation>
    </Paper>
  )
}

export default BottomNavigationBar
