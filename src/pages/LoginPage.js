import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../context/AuthContext"
import {auth, provider, signInWithPopup} from "../firebase"
import {Box, Button, TextField, Typography, Divider} from "@mui/material"
import GoogleIcon from "@mui/icons-material/Google"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {login} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = login(email, password)

    if (success) {
      navigate("/")
    } else {
      alert("Неверный email или пароль")
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider)
      navigate("/")
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        console.log("Окно авторизации закрыто пользователем")
      } else {
        console.log("Firebase Auth Error:", error.code)
        console.error(error)
        alert("Ошибка при входе через Google")
      }
    }
  }

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Вход
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{display: "flex", flexDirection: "column", gap: "16px"}}
      >
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Login
        </Button>
      </form>
      <Divider sx={{my: 2}}>OR</Divider>
      <Button
        onClick={handleGoogleLogin}
        variant="outlined"
        color="secondary"
        size="large"
        startIcon={<GoogleIcon />}
        fullWidth
      >
        Войти через Google
      </Button>
    </Box>
  )
}

export default LoginPage
