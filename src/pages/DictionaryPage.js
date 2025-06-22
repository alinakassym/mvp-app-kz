import {useState} from "react"
import {useTheme} from "../context/ThemeContext"
import Typography from "@mui/material/Typography"
import "./DictionaryPage.css"

function DictionaryPage() {
  const theme = useTheme()
  const [palette] = useState(theme.palette)
  return (
    <div className="page-container">
      <div
        className="page-header"
        style={{backgroundColor: palette.background.paper}}
      >
        <Typography variant="h6" gutterBottom>
          Словарь
        </Typography>
      </div>
    </div>
  )
}

export default DictionaryPage
