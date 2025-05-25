import React, {useState} from "react"
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material"
import {AccountCircle} from "@mui/icons-material"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../context/AuthContext"
import {ReactComponent as HomeIcon} from "../assets/icons/home.svg"
import {ReactComponent as UserIcon} from "../assets/icons/circle-user.svg"
import "./BottomNavigationBar.css"

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
    <div className="bottom-navigation-bar">
      <BottomNavigation
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
        }}
        value={value}
        onChange={(event, newValue) => handleNavigation(newValue)}
      >
        <BottomNavigationAction
          sx={{maxWidth: "50px", borderRadius: 28}}
          style={{
            fill: value === 0 ? "#3A94E7" : "#9E9E9E",
          }}
          icon={<HomeIcon style={{width: 28, height: 28}} />}
        />
        <BottomNavigationAction
          sx={{maxWidth: "50px", borderRadius: 28}}
          style={{
            fill: value === 1 ? "#3A94E7" : "#9E9E9E",
          }}
          icon={<UserIcon style={{width: 28, height: 28}} />}
        />
      </BottomNavigation>
    </div>
  )
}

export default BottomNavigationBar
