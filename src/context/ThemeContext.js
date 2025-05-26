import {createContext, useContext, useState, useMemo} from "react"
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles"

const ThemeContext = createContext()

export function ThemeProvider({children}) {
  const [mode, setMode] = useState("light")

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
  }

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
