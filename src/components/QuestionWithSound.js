import React from "react"
import {IconButton, Typography, Box} from "@mui/material"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import "./QuestionWithSound.css"

function QuestionWithSound({question, onClick}) {
  return (
    <Box className="question-with-sound-block">
      <span className="question-sound">
        <IconButton
          size="small"
          color="primary"
          aria-label="Воспроизвести"
          onClick={onClick}
        >
          <VolumeUpIcon />
        </IconButton>
      </span>
      {question.split(" ").map((word, index) => (
        <span className="question-word" key={index}>
          {word}
        </span>
      ))}
    </Box>
  )
}

export default QuestionWithSound
