import React, {useState} from "react"
import {BottomNavigation, BottomNavigationAction} from "@mui/material"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../context/AuthContext"
import {ReactComponent as HomeIcon} from "../assets/icons/home.svg"
import {ReactComponent as UserIcon} from "../assets/icons/user.svg"
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
    <div className="bottom-navigation-bar-wrapper">
      <BottomNavigation
        sx={{height: 68}}
        value={value}
        onChange={(event, newValue) => handleNavigation(newValue)}
      >
        <BottomNavigationAction
          sx={{pb: 2}}
          icon={<HomeIcon style={{height: 28, width: 28}} />}
        />
        <BottomNavigationAction
          sx={{pb: 2}}
          style={{
            fill: value === 1 ? "#3A94E7" : "#9E9E9E",
          }}
          icon={<UserIcon style={{height: 28, width: 28}} />}
        />
      </BottomNavigation>
    </div>
  )
}

export default BottomNavigationBar
