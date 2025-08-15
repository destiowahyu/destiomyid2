"use client"
import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") || "light" : "light"
    );
  const [resolvedTheme, setResolvedTheme] = useState("dark")
  const [mounted, setMounted] = useState(false)

  const resolveTheme = (currentTheme) => {
    return currentTheme === "light" ? "light" : "dark"
  }
  

  const applyTheme = (themeToApply) => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement
      root.classList.remove("light", "dark")
      root.classList.add(themeToApply)

      // Always remove existing forced styles first
      const existingStyle = document.getElementById("theme-force-style")
      if (existingStyle) existingStyle.remove()

      // Clear all inline styles from previous theme
      const allElements = document.querySelectorAll("*")
      allElements.forEach((element) => {
        element.style.removeProperty("color")
      })

      if (themeToApply === "light") {
        // Force light mode with inline styles
        document.body.style.setProperty("background-color", "rgb(230, 230, 230)", "important")
        document.body.style.setProperty("color", "black", "important")

        // Create aggressive CSS injection for light mode
        const style = document.createElement("style")
        style.id = "theme-force-style"
        style.innerHTML = `
          html.light,
          html.light body,
          html.light *:not(button):not(a) {
            color: black;
          }
          
          html.light body {
            background-color: rgb(230, 230, 230);
          }
          
          html.light h1,
          html.light h2,
          html.light h3,
          html.light h4,
          html.light h5,
          html.light h6 {
            color: rgba(0, 0, 0, 1);
          }
          
          html.light p,
          html.light span,
          html.light div:not([class*="bg-"]) {
          color: rgba(95, 95, 95, 1); },
          html.light a {
            color: rgba(95, 95, 95, 1);
          }
          
          html.light .text-gray-500 {
            color: rgb(107, 114, 128) !important;
          }
          
          html.light .text-gray-400 {
            color: rgb(156, 163, 175) !important;
          }
          
          html.light .bg-gray-700 *,
          html.light .bg-gray-800 *,
          html.light .bg-gray-900 * {
            color: rgba(255, 255, 255, 1);
          }
        `
        document.head.appendChild(style)

        // Force all existing elements with inline styles
        setTimeout(() => {
          const allElements = document.querySelectorAll("*")
          allElements.forEach((element) => {
            if (
            !element.closest(".bg-gray-700") &&
            !element.closest(".bg-gray-800") &&
            !element.closest(".bg-gray-900") &&
            !element.closest(".theme-toggle-btn") //
            ) {
            element.style.setProperty("color", "black", "important")
            }

          })
        }, 0)
      } else {
        // Dark mode - force dark colors
        document.body.style.setProperty("background-color", "rgb(17, 24, 39)")
        document.body.style.setProperty("color", "rgb(243, 244, 246)", "important")

        // Create aggressive CSS injection for dark mode
        const style = document.createElement("style")
        style.id = "theme-force-style"
        style.innerHTML = `
        html.dark,
        html.dark body,
        html.dark *:not(button):not(a) {
            color: rgb(243, 244, 246);
        }
        
        html.dark body {
            background-color: rgb(17, 24, 39) !important;
        }
        
        html.dark h1,
        html.dark h2,
        html.dark h3,
        html.dark h4,
        html.dark h5,
        html.dark h6 {
            color: rgb(243, 244, 246) !important;
        }
        
        html.dark p,
        html.dark span,
        html.dark a {
            color: rgba(173, 173, 173, 1) !important;
        }
        
        html.dark div:not([class*="bg-"]) {
        color: rgba(173, 173, 173, 1) !important;
        }


        `
        document.head.appendChild(style)

        // Force all existing elements to dark mode colors
        setTimeout(() => {
          const allElements = document.querySelectorAll("*")
          allElements.forEach((element) => {
            // Respect explicit text color utilities from Tailwind on selected areas
            const hasExplicitColor = Array.from(element.classList || []).some((cls) =>
              ["text-black", "text-white"].includes(cls)
            )
            if (hasExplicitColor) return

            element.style.setProperty("color", "rgba(173, 173, 173, 1)", "important")
          })
        }, 0)
      }
    }
  }

  useEffect(() => {
    setMounted(true)

    // Get theme from localStorage or script that already applied it
    const savedTheme = localStorage.getItem("theme") || "dark"
    const currentTheme = document.documentElement.classList.contains("light") ? "light" : "dark"

    // Use the theme that's already applied by the script
    const finalTheme = currentTheme

    setTheme(finalTheme)
    const resolved = resolveTheme(finalTheme)
    setResolvedTheme(resolved)

    // Apply theme again to ensure consistency
    applyTheme(resolved)
  }, [])

  const setThemeMode = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    const resolved = resolveTheme(newTheme)
    setResolvedTheme(resolved)
    applyTheme(resolved)
  }

  const value = {
    theme,
    resolvedTheme,
    setTheme: setThemeMode,
    mounted,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
