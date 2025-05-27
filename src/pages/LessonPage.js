import React from "react"
import {Button} from "@mui/material"
import {useNavigate, useParams} from "react-router-dom"
import "./LessonPage.css"

function LessonPage() {
  const navigate = useNavigate()
  const {lessonId} = useParams()

  const handleClose = () => {
    navigate(-1) // Возвращаемся на предыдущую страницу
  }

  return (
    <div className="lesson-page">
      <div className="lesson-page-content">
        <h1>Урок {lessonId}</h1>
        <p>Здесь будет содержимое урока.</p>
        <Button onClick={handleClose}>Закрыть</Button>
      </div>
    </div>
  )
}

export default LessonPage
