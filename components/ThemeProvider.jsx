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

  // Inject transition keyframes once and expose a global helper to play transitions
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!document.getElementById("theme-transition-styles")) {
      const style = document.createElement("style")
      style.id = "theme-transition-styles"
      style.innerHTML = `
        @keyframes themeRadialReveal {
          0% { transform: translate(var(--tx, -50%), var(--ty, -50%)) scale(0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translate(var(--tx, -50%), var(--ty, -50%)) scale(50); opacity: 0; }
        }

        @keyframes starTwinkle {
          0% { transform: scale(0.6); opacity: 0; }
          30% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0.6); opacity: 0; }
        }

        @keyframes sunRayPulse {
          0% { opacity: 0; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: scale(1) rotate(180deg); }
        }
      `
      document.head.appendChild(style)
    }

    // Expose a global to play transition centered at last click
    window.__playThemeTransition = (target) => {
      const overlay = document.createElement("div")
      overlay.id = `theme-transition-overlay-${Date.now()}`
      overlay.style.position = "fixed"
      overlay.style.inset = "0"
      overlay.style.pointerEvents = "none"
      overlay.style.zIndex = "9999"
      overlay.style.overflow = "hidden"

      // Container to hold the radial circle at click position
      const cx = getComputedStyle(document.documentElement).getPropertyValue("--click-x") || "50vw"
      const cy = getComputedStyle(document.documentElement).getPropertyValue("--click-y") || "50vh"

      const circle = document.createElement("div")
      circle.style.position = "absolute"
      circle.style.left = cx
      circle.style.top = cy
      circle.style.width = "2px"
      circle.style.height = "2px"
      circle.style.borderRadius = "9999px"
      circle.style.transformOrigin = "center"
      circle.style.willChange = "transform, opacity"
      circle.style.setProperty("--tx", "-50%")
      circle.style.setProperty("--ty", "-50%")
      circle.style.transform = "translate(-50%, -50%) scale(0)"
      circle.style.animation = "themeRadialReveal 900ms ease-in-out forwards"

      if (target === "dark") {
        // Night: warm-to-deep gradient and twinkling stars
        circle.style.background = "radial-gradient(circle, rgba(17,24,39,0) 0%, rgba(17,24,39,0.8) 30%, rgba(17,24,39,1) 60%, rgba(0,0,0,1) 100%)"

        // Add twinkling stars
        for (let i = 0; i < 18; i++) {
          const star = document.createElement("span")
          star.style.position = "absolute"
          star.style.left = `${Math.random() * 100}%`
          star.style.top = `${Math.random() * 100}%`
          star.style.width = `${2 + Math.random() * 2}px`
          star.style.height = star.style.width
          star.style.borderRadius = "9999px"
          star.style.background = ["#fde68a", "#fef3c7", "#f59e0b"][i % 3]
          star.style.boxShadow = "0 0 6px rgba(250, 204, 21, 0.8)"
          star.style.animation = `starTwinkle ${600 + Math.random() * 500}ms ease-in-out ${Math.random() * 200}ms forwards`
          overlay.appendChild(star)
        }
      } else {
        // Day: bright flare with soft yellow/orange
        circle.style.background = "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(253, 230, 138, 0.9) 20%, rgba(245, 158, 11, 0.8) 40%, rgba(255,255,255,0) 80%)"

        // Sun rays pulse
        const rays = document.createElement("div")
        rays.style.position = "absolute"
        rays.style.left = cx
        rays.style.top = cy
        rays.style.width = "48px"
        rays.style.height = "48px"
        rays.style.transform = "translate(-50%, -50%)"
        for (let i = 0; i < 12; i++) {
          const ray = document.createElement("span")
          ray.style.position = "absolute"
          ray.style.left = "50%"
          ray.style.top = "50%"
          ray.style.width = "18px"
          ray.style.height = "3px"
          ray.style.borderRadius = "9999px"
          ray.style.background = i % 2 === 0 ? "#fde68a" : "#f59e0b"
          ray.style.opacity = "0.95"
          ray.style.transform = `translate(-50%, -50%) rotate(${(i / 12) * 360}deg) translateX(16px)`
          ray.style.animation = "sunRayPulse 900ms ease-out forwards"
          rays.appendChild(ray)
        }
        overlay.appendChild(rays)
      }

      overlay.appendChild(circle)
      document.body.appendChild(overlay)

      setTimeout(() => {
        overlay.remove()
      }, 950)
    }
  }, [])

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
