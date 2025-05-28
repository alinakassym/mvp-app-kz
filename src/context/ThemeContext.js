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
        cssVariables: true,
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
        colorSchemes: {
          light: {
            palette: {
              mode,
              primary: {
                light: "#D0EFFF",
                main: "#3A94E7",
              },
              secondary: {
                light: "#FFFFFF", //"#0C0C0F",
                main: "#9E9E9E",
              },
              success: {
                main: "#58C11E",
                light: "#EDFDE4",
              },
              warning: {
                main: "#F3AE29",
              },
              error: {
                main: "#f44336",
                light: "#fcd0cd",
              },
              background: {
                default: "#f7fcff",
                paper: "#FFFFFF",
              },
            },
          },
          dark: {
            palette: {
              mode,
              primary: {
                light: "#1F2025",
                main: "#3A94E7",
              },
              secondary: {
                light: "#0e253a", //"#0C0C0F",
                main: "#9E9E9E",
              },
              success: {
                main: "#58C11E",
                light: "#EDFDE4",
              },
              warning: {
                main: "#F3AE29",
              },
              error: {
                main: "#f44336",
                light: "#fcd0cd",
              },
              background: {
                default: "#15161A",
                paper: "#15161A",
              },
            },
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
