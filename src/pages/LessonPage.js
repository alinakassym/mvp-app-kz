import React, {useState, useEffect} from "react"
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  IconButton,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import {useNavigate, useParams} from "react-router-dom"
import quizzesData from "../static/lesson1.json"
import "./LessonPage.css"

function LessonPage() {
  const navigate = useNavigate()
  const {lessonId} = useParams()
  const parsedLessonId = Number(lessonId)
  const [quizzes, setQuizzes] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [retryQueue, setRetryQueue] = useState([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    const lessonQuizzes = quizzesData.quizzes.filter(
      (quiz) => quiz.lessonId === parsedLessonId
    )
    setQuizzes(lessonQuizzes)
    setCurrentIndex(0)
    setRetryQueue([])
    setIsCompleted(false)
    setSelectedOption(null)
    setIsChecked(false)
  }, [parsedLessonId])

  const currentQuiz = quizzes[currentIndex]

  const handleSelect = (option) => {
    if (!isChecked) setSelectedOption(option)
  }

  const handleCheckAnswer = () => {
    if (!selectedOption) return

    const isCorrect = selectedOption.isCorrect
    setFeedback(isCorrect ? "Правильно!" : "Неправильно")
    setIsChecked(true)
  }

  const handleNext = () => {
    if (!selectedOption?.isCorrect) {
      setRetryQueue((prev) => [...prev, currentQuiz])
    }

    const nextIndex = currentIndex + 1
    if (nextIndex < quizzes.length) {
      setCurrentIndex(nextIndex)
    } else if (retryQueue.length > 0) {
      setQuizzes(retryQueue)
      setCurrentIndex(0)
      setRetryQueue([])
    } else {
      setIsCompleted(true)
    }
    setSelectedOption(null)
    setIsChecked(false)
    setFeedback(null)
  }

  if (!currentQuiz && !isCompleted) return <div>Загрузка урока...</div>

  if (isCompleted) {
    return (
      <div className="lesson-page">
        <div className="lesson-page-header">
          <IconButton onClick={() => navigate(-1)}>
            <CloseIcon />
          </IconButton>
          <LinearProgress
            className="lesson-progress"
            variant="determinate"
            value={100}
          />
        </div>
        <div className="lesson-page-content">
          <Typography variant="h4">Поздравляем!</Typography>
          <Typography variant="h6" gutterBottom>
            Вы завершили урок {lessonId}.
          </Typography>
        </div>
        <div className="lesson-page-footer">
          <Typography variant="subtitle1">Отличная работа!</Typography>
        </div>
      </div>
    )
  }

  return (
    <div className="lesson-page">
      <div className="lesson-page-header">
        <IconButton size="small" onClick={() => navigate(-1)}>
          <CloseIcon sx={{height: "22px"}} />
        </IconButton>
        <Box sx={{width: "100%"}}>
          <LinearProgress
            className="lesson-progress"
            variant="determinate"
            value={((currentIndex + 1) / quizzes.length) * 100}
          />
        </Box>
      </div>

      <div className="lesson-page-content">
        <Typography variant="body1" gutterBottom>
          {currentQuiz.description}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {currentQuiz.question}
        </Typography>

        {currentQuiz.options.map((option) => (
          <Card
            key={option.id}
            className={`quiz-option ${
              selectedOption?.id === option.id ? "selected" : ""
            } ${isChecked && option.isCorrect ? "correct" : ""} ${
              isChecked && selectedOption?.id === option.id && !option.isCorrect
                ? "incorrect"
                : ""
            }`}
            onClick={() => handleSelect(option)}
          >
            <CardContent>
              <Typography>{option.text}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="lesson-page-footer">
        <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
          {feedback && (
            <Typography
              variant="subtitle1"
              sx={{mb: 1}}
              color={selectedOption?.isCorrect ? "green" : "error"}
            >
              {feedback}
            </Typography>
          )}
          {selectedOption && !isChecked && (
            <Button variant="contained" onClick={handleCheckAnswer}>
              Проверить
            </Button>
          )}
          {isChecked && (
            <Button variant="contained" onClick={handleNext}>
              Далее
            </Button>
          )}
        </Box>
      </div>
    </div>
  )
}

export default LessonPage
