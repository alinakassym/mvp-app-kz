import React, {useState, useEffect} from "react"
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material"
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

  useEffect(() => {
    const loadQuizzes = () => {
      const lessonQuizzes = quizzesData.quizzes.filter(
        (quiz) => quiz.lessonId === parsedLessonId
      )
      setQuizzes(lessonQuizzes)
      setCurrentIndex(0)
      setRetryQueue([])
      setIsCompleted(false)
    }
    loadQuizzes()
  }, [parsedLessonId])

  const currentQuiz = quizzes[currentIndex]

  const handleAnswer = (isCorrect) => {
    setFeedback(isCorrect ? "Правильно!" : "Неправильно")

    setTimeout(() => {
      setFeedback(null)
      if (!isCorrect) {
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
    }, 600)
  }

  if (!currentQuiz && !isCompleted) return <div>Загрузка...</div>

  if (isCompleted) {
    return (
      <div className="lesson-page">
        <div className="lesson-page-content">
          <Typography variant="h4">Поздравляем!</Typography>
          <Typography variant="h6" gutterBottom>
            Вы завершили урок {lessonId}.
          </Typography>
          <Button onClick={() => navigate(-1)} variant="contained">
            Вернуться назад
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="lesson-page">
      <div className="lesson-page-content">
        <Box mb={2}>
          <LinearProgress
            variant="determinate"
            value={((currentIndex + 1) / quizzes.length) * 100}
          />
        </Box>
        <Typography variant="h6" gutterBottom>
          {currentQuiz.question}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {currentQuiz.description}
        </Typography>
        {currentQuiz.options.map((option) => (
          <Card
            key={option.id}
            className="quiz-option"
            onClick={() => handleAnswer(option.isCorrect)}
          >
            <CardContent>
              <Typography>{option.text}</Typography>
            </CardContent>
          </Card>
        ))}
        {feedback && (
          <Typography variant="subtitle1" style={{marginTop: 12}}>
            {feedback}
          </Typography>
        )}
        <Button onClick={() => navigate(-1)} style={{marginTop: "1rem"}}>
          Закрыть
        </Button>
      </div>
    </div>
  )
}

export default LessonPage
