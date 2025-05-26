import {createContext, useContext, useState, useMemo, useEffect} from "react"
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles"

const ThemeContext = createContext()

export function ThemeProvider({children}) {
  const [mode, setMode] = useState(() => {
    // Инициализация темы из localStorage
    return localStorage.getItem("theme") || "light"
  })

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light"
      localStorage.setItem("theme", newMode) // Сохранение в localStorage
      return newMode
    })
  }

  useEffect(() => {
    // Обновление localStorage при изменении темы
    localStorage.setItem("theme", mode)
  }, [mode])

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#3A94E7",
          },
          secondary: {
            main: "#9E9E9E",
          },
        },
      }),
    [mode]
  )

  return (
    <ThemeContext.Provider value={{mode, toggleTheme}}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
