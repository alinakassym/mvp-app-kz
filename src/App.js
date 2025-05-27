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
import LessonPage from "./pages/LessonPage"
import PrivateRoute from "./components/PrivateRoute"
import BottomNavigationBar from "./components/BottomNavigationBar"

function AppContent() {
  const location = useLocation()
  const state = location.state || {}

  return (
    <>
      <Routes location={state.backgroundLocation || location}>
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
        <Route
          path="/lesson/:lessonId"
          element={
            <PrivateRoute>
              <LessonPage />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* Модальное окно для LessonPage */}
      {state.backgroundLocation && (
        <Routes>
          <Route
            path="/lesson/:lessonId"
            element={
              <PrivateRoute>
                <LessonPage />
              </PrivateRoute>
            }
          />
        </Routes>
      )}

      {location.pathname !== "/login" &&
        !location.pathname.startsWith("/lesson/") && <BottomNavigationBar />}
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
