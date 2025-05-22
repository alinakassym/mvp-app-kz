import {Link} from "react-router-dom"
function HomePage() {
  return (
    <div>
      <h2>Home</h2>
      <Link to="/profile">Перейти в профиль</Link>
    </div>
  )
}

export default HomePage
