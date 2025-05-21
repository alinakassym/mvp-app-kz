import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  return (
    <Router>
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
    </Router>
  )
}

export default App
