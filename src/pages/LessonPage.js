import React, {useState, useEffect, useRef} from "react"
import {useTheme} from "../context/ThemeContext"
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
  const audioRef = useRef(null)
  const theme = useTheme()
  const [palette] = useState(theme.palette)
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

  useEffect(() => {
    if (currentQuiz?.sound) {
      const audio = new Audio(`/sounds/${currentQuiz.sound}`)
      audioRef.current = audio
      audio.play().catch((e) => {
        console.warn("Не удалось воспроизвести звук:", e)
      })
    }
  }, [currentQuiz])

  const handleSelect = (option) => {
    if (!isChecked) setSelectedOption(option)
  }

  const handleCheckAnswer = () => {
    if (!selectedOption) return
    setFeedback(selectedOption.isCorrect ? "Правильно!" : "Неправильно")
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
            Вы завершили урок {Number(lessonId) + 1}.
          </Typography>
        </div>
        <div className="lesson-page-footer">
          <Typography variant="subtitle1">Отличная работа!</Typography>
        </div>
      </div>
    )
  }

  const handleReplaySound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current
        .play()
        .catch((e) => console.warn("Ошибка при воспроизведении звука:", e))
    }
  }

  return (
    <div className="lesson-page">
      <div className="lesson-page-header">
        <IconButton size="small" onClick={() => navigate(-1)}>
          <CloseIcon sx={{height: "22px"}} />
        </IconButton>
        <Box sx={{width: "100%"}}>
          <LinearProgress
            sx={{height: 8, borderRadius: 2}}
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
        <Button
          variant="outlined"
          size="small"
          onClick={handleReplaySound}
          sx={{mb: 2}}
        >
          🔊 Воспроизвести
        </Button>

        {currentQuiz.options.map((option) => (
          <Card
            key={option.id}
            sx={{borderRadius: 3}}
            variant="custom1"
            style={{
              backgroundColor: theme.mode === "dark" && palette.primary.light,
              borderColor:
                !isChecked && selectedOption?.id === option.id
                  ? palette.primary.main
                  : isChecked && option.isCorrect
                  ? palette.success.main
                  : isChecked &&
                    selectedOption?.id === option.id &&
                    !option.isCorrect
                  ? palette.error.main
                  : "",
            }}
            className="quiz-option animate"
            onClick={() => handleSelect(option)}
          >
            <CardContent>
              <Typography>{option.text}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <div
        className="lesson-page-footer"
        style={{
          backgroundColor:
            !selectedOption && !isChecked
              ? ""
              : isChecked && selectedOption && selectedOption?.isCorrect
              ? palette.success.light
              : isChecked && selectedOption && !selectedOption?.isCorrect
              ? palette.error.light
              : "",
        }}
      >
        <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
          {feedback && (
            <Typography
              variant="subtitle1"
              sx={{mb: 1, fontWeight: "bold"}}
              color={selectedOption?.isCorrect ? "green" : "error"}
            >
              {feedback}
            </Typography>
          )}
          {selectedOption && !isChecked && (
            <Button
              size="large"
              variant="contained"
              onClick={handleCheckAnswer}
            >
              Проверить
            </Button>
          )}
          {isChecked && (
            <Button
              size="large"
              color={selectedOption?.isCorrect ? "success" : "error"}
              variant="contained"
              onClick={handleNext}
            >
              Далее
            </Button>
          )}
        </Box>
      </div>
    </div>
  )
}

export default LessonPage
