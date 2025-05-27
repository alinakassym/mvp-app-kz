import {useTheme} from "../context/ThemeContext"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Chip from "@mui/material/Chip"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepContent from "@mui/material/StepContent"
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

  const [activeSection] = useState(1)
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

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
                <Stepper
                  activeStep={activeSection === section.id ? activeStep : -1}
                  orientation="vertical"
                >
                  {section.lessons.map((lesson) => (
                    <Step key={lesson.id}>
                      <StepLabel>{lesson.name}</StepLabel>
                      <StepContent>
                        <Box sx={{mb: 2}}>
                          <Button sx={{mt: 1, mr: 1}}>Начать урок</Button>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{mt: 1, mr: 1}}
                          >
                            Пропустить
                          </Button>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
