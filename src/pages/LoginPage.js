import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../context/AuthContext"
import {auth, provider, signInWithPopup} from "../firebase"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {login, setUser} = useAuth()
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
      const result = await signInWithPopup(auth, provider)
      const userData = {email: result.user.email}
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      navigate("/")
    } catch (error) {
      alert("Ошибка при входе через Google")
      console.error(error)
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
