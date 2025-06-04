import {createContext, useContext, useState, useMemo, useEffect} from "react"
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles"

const ThemeContext = createContext()

export function ThemeProvider({children}) {
  const getSystemTheme = () =>
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"

  const [mode, setMode] = useState(() => {
    return getSystemTheme() || localStorage.getItem("theme") || "light"
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
        typography: {
          fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: "8px",
                fontWeight: 600,
                variants: [
                  {
                    props: {variant: "contained"},
                    style: {
                      color: "#FFFFFF",
                    },
                  },
                ],
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                variants: [
                  {
                    props: {variant: "custom1"},
                    style: {
                      boxShadow:
                        mode === "light"
                          ? "0px 2px 30px rgba(58, 148, 231, 0.1)"
                          : "none",
                    },
                  },
                  {
                    props: {variant: "custom2"},
                    style: {
                      boxShadow:
                        mode === "light"
                          ? "0px 2px 30px rgba(58, 148, 231, 0.15)"
                          : "none",
                    },
                  },
                  {
                    props: {variant: "custom-outlined"},
                    style: {
                      borderWidth: 1,
                      borderColor: "#e0e0e0",
                      backgroundColor: "transparent",
                    },
                  },
                ],
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                variants: [
                  {
                    props: {variant: "custom1"},
                    style: {
                      boxShadow:
                        mode === "light"
                          ? "0px 2px 30px rgba(58, 148, 231, 0.1)"
                          : "none",
                    },
                  },
                  {
                    props: {variant: "custom2"},
                    style: {
                      boxShadow:
                        mode === "light"
                          ? "0px 2px 30px rgba(58, 148, 231, 0.15)"
                          : "none",
                    },
                  },
                ],
              },
            },
          },
        },
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
          success: {
            main: "#58C11E",
            light: "#EDFDE4",
          },
          warning: {
            main: "#F3AE29",
            light: "#fcebca",
          },
          error: {
            main: "#f44336",
            light: "#fcd0cd",
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
