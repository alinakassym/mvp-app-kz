import {createContext, useContext, useState, useMemo, useEffect} from "react"
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles"

const ThemeContext = createContext()

export function ThemeProvider({children}) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "light"
  })

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light"
      localStorage.setItem("theme", newMode)
      return newMode
    })
  }

  useEffect(() => {
    localStorage.setItem("theme", mode)
  }, [mode])

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            light: mode === "light" ? "#D0EFFF" : "#1F2025",
            main: "#3A94E7",
          },
          secondary: {
            light: mode === "light" ? "#FFFFFF" : "#0e253a", //"#0C0C0F",
            main: "#9E9E9E",
          },
          warning: {
            main: "#F3AE29",
          },
          background: {
            default: mode === "light" ? "#f7fcff" : "#15161A",
            paper: mode === "light" ? "#ffffff" : "#15161A",
          },
        },
      }),
    [mode]
  )

  return (
    <ThemeContext.Provider value={{mode, toggleTheme, ...theme}}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
