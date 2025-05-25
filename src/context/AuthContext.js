import {createContext, useContext, useState, useEffect} from "react"
import {onAuthStateChanged, signOut} from "firebase/auth"
import {auth} from "../firebase"

const AuthContext = createContext()

export function AuthProvider({children}) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setLoading(false)
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("User state changed:", firebaseUser)
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
    const demoEmail = "test@test.kz"
    const demoPassword = "asd12345"

    if (email === demoEmail && password === demoPassword) {
      const userData = {email}
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      return true
    }

    return false
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null)
        localStorage.removeItem("user")
        console.log("User logged out")
      })
      .catch((error) => {
        console.error("Firebase signOut error:", error)
      })
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
