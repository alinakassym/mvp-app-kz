import DiamondIcon from "@mui/icons-material/Diamond"
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment"
import "./HomePage.css"
function HomePage() {
  return (
    <div className="home-page">
      <div className="home-page-header">
        <div className="home-page-header-icon-item" style={{color: "#3A94E7"}}>
          <DiamondIcon />
          <span>451</span>
        </div>
        <div className="home-page-header-icon-item" style={{color: "#F3AE29"}}>
          <LocalFireDepartmentIcon />
          <span>3</span>
        </div>
      </div>
      <div className="home-page-content-wrapper">
        <div className="home-page-content">
          Test test
          {Array(50)
            .fill(
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            )
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
