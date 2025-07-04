import {useTheme} from "../context/ThemeContext"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepContent from "@mui/material/StepContent"
import Paper from "@mui/material/Paper"
import {Diamond as DiamondIcon} from "@mui/icons-material"
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment"
import "./HomePage.css"
import {useEffect, useState} from "react"
import testData from "../static/lessons.json"
import {useNavigate} from "react-router-dom"

function fetchSections() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(testData.queryResult)
    }, 5)
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
  const [palette] = useState(theme.palette)

  const sections = useSections()
  const [activeSection] = useState(1)
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const navigate = useNavigate()

  const handleLessonStart = (lessonId) => {
    navigate(`/lesson/${lessonId}`)
  }

  return (
    <div className="page-container">
      <div
        className="page-header"
        style={{backgroundColor: palette.background.paper}}
      >
        <div
          className="home-page-header-icon-item"
          style={{color: palette.primary.main}}
        >
          <DiamondIcon />
          <span>451</span>
        </div>
        <div
          className="home-page-header-icon-item"
          style={{color: palette.warning.main}}
        >
          <LocalFireDepartmentIcon />
          <span>3</span>
        </div>
      </div>
      <div className="page-content-wrapper">
        <div className="home-page-content">
          {sections.map((section, index) => (
            <Paper
              key={index}
              variant="custom2"
              sx={{
                p: 3,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: palette.primary.light,
              }}
              style={{
                backgroundColor:
                  activeSection !== section.id
                    ? palette.primary.light
                    : palette.secondary.light,
              }}
            >
              <Typography variant="h6" gutterBottom>
                {section.name}
              </Typography>
              <Stepper
                activeStep={activeSection === section.id ? activeStep : -1}
                orientation="vertical"
              >
                {section.lessons.map((lesson) => (
                  <Step key={lesson.id}>
                    <StepLabel>{lesson.name}</StepLabel>
                    <StepContent>
                      <Box sx={{mb: 2}}>
                        <Button
                          variant="contained"
                          sx={{mt: 1, mr: 1}}
                          onClick={() => handleLessonStart(lesson.id)}
                        >
                          Начать урок
                        </Button>
                        <Button onClick={handleNext} sx={{mt: 1, mr: 1}}>
                          Пропустить
                        </Button>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
