import {createContext, useContext, useState, useEffect} from "react"

const AuthContext = createContext()

export function AuthProvider({children}) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (email, password) => {
    // заглушка (заменим позже на запрос к серверу)
    const demoEmail = "test@example.com"
    const demoPassword = "123456"

    if (email === demoEmail && password === demoPassword) {
      const userData = {email}
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
