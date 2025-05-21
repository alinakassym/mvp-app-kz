import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../context/AuthContext"

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
    </div>
  )
}

export default LoginPage
