import {useTheme} from "../context/ThemeContext"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Chip from "@mui/material/Chip"
import {Diamond as DiamondIcon} from "@mui/icons-material"
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment"
import "./HomePage.css"
import {useEffect, useState} from "react"
import testData from "./test.json"
function fetchSections() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(testData.queryResult)
    }, 500) // Simulate a delay
  })
}

function useSections() {
  const [sections, setSections] = useState([])

  useEffect(() => {
    fetchSections().then((data) => setSections(data))
  }, [])

  return sections
}
function HomePage() {
  const theme = useTheme()
  const sections = useSections()
  return (
    <div className="home-page">
      <div
        className="home-page-header"
        style={{backgroundColor: theme.palette.background.paper}}
      >
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
          {sections.map((section, index) => (
            <div key={index}>
              <Divider sx={{mb: 2}}>
                <Chip label={section.name} size="small" />
              </Divider>
              <div className="home-page-section">
                {section.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className="home-page-lesson-card"
                    onClick={() => {
                      window.location.href = "/ProfilePage"
                    }}
                  >
                    <Typography variant="body1" component="div">
                      {lesson.name}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                      {lesson.content}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
