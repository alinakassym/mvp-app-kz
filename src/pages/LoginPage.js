import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../context/AuthContext"
import {auth, provider, signInWithPopup} from "../firebase"

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
      // Firebase сам вызовет onAuthStateChanged, и мы попадём в navigate("/") из AuthContext
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <hr />

      <button onClick={handleGoogleLogin}>Войти через Google</button>
    </div>
  )
}

export default LoginPage
