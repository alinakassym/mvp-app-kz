import {CssBaseline} from "@mui/material"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import PrivateRoute from "./components/PrivateRoute"
import BottomNavigationBar from "./components/BottomNavigationBar"

function AppContent() {
  const location = useLocation()

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
      {location.pathname !== "/login" && <BottomNavigationBar />}
    </>
  )
}

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <AppContent /> {/* Вызов AppContent внутри Router */}
      </Router>
    </>
  )
}

export default App
