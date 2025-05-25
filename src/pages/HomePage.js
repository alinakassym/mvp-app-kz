import {Link} from "react-router-dom"
import DiamondIcon from "@mui/icons-material/Diamond"
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment"
import "./HomePage.css"
function HomePage() {
  return (
    <div className="home-page">
      <div className="home-page-header">
        <div className="home-page-header-icon-item" style={{color: "#3A94E7"}}>
          <DiamondIcon />
          <span>3</span>
        </div>
        <div className="home-page-header-icon-item" style={{color: "#F3AE29"}}>
          <LocalFireDepartmentIcon />
          <span>3</span>
        </div>
      </div>
      <div className="home-page-content">
        <div>Content</div>
      </div>
    </div>
  )
}

export default HomePage
