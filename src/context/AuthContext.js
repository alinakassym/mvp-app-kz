import {createContext, useContext, useState, useEffect} from "react"
import {onAuthStateChanged} from "firebase/auth"
import {auth} from "../firebase"

const AuthContext = createContext()

export function AuthProvider({children}) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {email: firebaseUser.email}
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
      } else {
        setUser(null)
        localStorage.removeItem("user")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = (email, password) => {
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
    <AuthContext.Provider value={{user, login, logout, loading}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
