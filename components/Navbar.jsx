"use client"
import { useRef, useState, useEffect } from "react"
 import { motion } from "framer-motion"
import Image from "next/image"
import Logotype from "@/public/image/logotype.png"
import { useRouter } from "next/navigation"
import { useTheme } from "@/components/ThemeProvider"
 
import LanguageToggle from "./LanguageToggle"

 // Colored, non-monotone SVGs for nicer look
 const ColoredSunIcon = ({ size = 16 }) => (
   <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
     <defs>
       <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
         <stop offset="0%" stopColor="#FFE08A" />
         <stop offset="60%" stopColor="#FDBA74" />
         <stop offset="100%" stopColor="#F59E0B" />
       </radialGradient>
       <linearGradient id="sunRay" x1="0" y1="0" x2="1" y2="0">
         <stop offset="0%" stopColor="#FDE68A" />
         <stop offset="100%" stopColor="#F59E0B" />
       </linearGradient>
     </defs>
     <circle cx="32" cy="32" r="12" fill="url(#sunCore)" />
     {Array.from({ length: 12 }).map((_, i) => {
       const angle = (i / 12) * Math.PI * 2
       const x1 = 32 + Math.cos(angle) * 18
       const y1 = 32 + Math.sin(angle) * 18
       const x2 = 32 + Math.cos(angle) * 26
       const y2 = 32 + Math.sin(angle) * 26
       return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#sunRay)" strokeWidth="3" strokeLinecap="round" />
     })}
   </svg>
 )
 
 const ColoredMoonIcon = ({ size = 16 }) => (
   <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
     <defs>
       <radialGradient id="moonSkin" cx="50%" cy="50%" r="50%">
         <stop offset="0%" stopColor="#FFB26B" />
         <stop offset="70%" stopColor="#FB923C" />
         <stop offset="100%" stopColor="#EA580C" />
       </radialGradient>
       <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
         <stop offset="0%" stopColor="rgba(0,0,0,0.15)" />
         <stop offset="100%" stopColor="rgba(0,0,0,0)" />
       </radialGradient>
     </defs>
     <path d="M44 12c-3.5 2.5-6 6.7-6 11.5C38 32.5 47.5 42 59 42c1.7 0 3.3-.2 4.8-.6C60.2 50.7 51 56 40.8 56 25.9 56 14 44.1 14 29.2 14 19 19.3 9.8 27.6 4.2 27.2 5.7 27 7.3 27 9c0 11 9.5 20 21 20 4.8 0 9-2.5 11.5-6z" transform="translate(-8,0)" fill="url(#moonSkin)" />
     <circle cx="34" cy="26" r="8" fill="url(#shadow)" />
     <circle cx="28" cy="38" r="4" fill="url(#shadow)" />
   </svg>
 )
 
 const ThemeToggle = ({ isNavOpen }) => {
  const { theme, setTheme, resolvedTheme, mounted } = useTheme()
  const [animatingTo, setAnimatingTo] = useState(null) // "dark" | "light" | null

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full">
        <div className="w-4 h-4"></div>
      </div>
    )
  }

  const triggerAnimationThenToggle = () => {
    const target = theme === "light" ? "dark" : "light"
    // capture click center as CSS vars for overlay
    const handle = (e) => {
      const x = e.clientX || window.innerWidth / 2
      const y = e.clientY || window.innerHeight / 2
      const root = document.documentElement
      root.style.setProperty("--click-x", `${x}px`)
      root.style.setProperty("--click-y", `${y}px`)
      window.removeEventListener("mousemove", handle)
    }
    window.addEventListener("mousemove", handle, { once: true })

    // play page transition overlay if available
    if (typeof window !== "undefined" && typeof window.__playThemeTransition === "function") {
      window.__playThemeTransition(target)
    }
    setAnimatingTo(target)

    // Allow the animation to play, then set the theme near the end for a seamless feel
    // Animation total ~700ms; switch at 450ms
    setTimeout(() => {
      setTheme(target)
    }, 450)

    // Clear animation state
    setTimeout(() => {
      setAnimatingTo(null)
    }, 800)
  }

  const isGoingDark = animatingTo === "dark"
  const isGoingLight = animatingTo === "light"

  const baseColor = isNavOpen ? "#ffffff" : resolvedTheme === "light" ? "#000000" : "#ffffff"

  return (
    <button
      className={`theme-toggle-btn relative overflow-visible flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200 ${
        isNavOpen ? "text-white" : resolvedTheme === "light" ? "text-black" : "text-white"
      }`}
      style={{ color: baseColor }}
      onClick={triggerAnimationThenToggle}
      aria-label="Toggle theme"
    >
       {/* Base icon with enhanced effects: glow + orbiters */
       }
      <motion.div
        key={`icon-${resolvedTheme}-${animatingTo ?? "idle"}`}
        initial={{ scale: 1, rotate: 0 }}
        animate={{
          scale: isGoingDark || isGoingLight ? 1.15 : 1,
          rotate: isGoingLight ? 180 : isGoingDark ? -90 : 0,
          filter:
            isGoingDark || isGoingLight
              ? "drop-shadow(0 0 6px rgba(245,158,11,0.8))"
              : "none",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30, duration: 0.35 }}
        className="theme-toggle-icon"
      >
        {resolvedTheme === "light" || isGoingDark ? (
          <ColoredSunIcon size={16} />
        ) : (
          <ColoredMoonIcon size={16} />
        )}
      </motion.div>

      {/* Orbiting dots around moon while going dark */}
      {isGoingDark && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={`orbit-${i}`}
              className="absolute left-1/2 top-1/2"
              style={{ width: 2, height: 2, borderRadius: 9999, background: "#fcd34d" }}
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9 + i * 0.1, ease: "linear" }}
            >
              <span
                className="absolute"
                style={{
                  left: "-2px",
                  top: "-2px",
                  width: 4,
                  height: 4,
                  borderRadius: 9999,
                  background: ["#fef3c7", "#fde68a", "#f59e0b"][i],
                  transform: `translate(${8 + i * 3}px, 0)`,
                }}
              />
            </motion.span>
          ))}
        </motion.div>
      )}

      {/* Stars burst when going to dark */}
      {isGoingDark && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
        >
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2
            const distance = 18
            const x = Math.cos(angle) * distance
            const y = Math.sin(angle) * distance
            return (
              <motion.span
                key={`star-${i}`}
                className="absolute block"
                style={{ left: "50%", top: "50%" }}
                initial={{ x: 0, y: 0, scale: 0.4, rotate: 0, opacity: 0 }}
                animate={{ x, y, scale: [0.4, 1, 0.4], rotate: 180, opacity: [0, 1, 0] }}
                transition={{ duration: 0.75, ease: "easeOut" }}
              >
                <span
                  className="block"
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    background: i % 3 === 0 ? "#fde68a" : i % 3 === 1 ? "#fef3c7" : "#f59e0b",
                    boxShadow: "0 0 6px rgba(250, 204, 21, 0.8)",
                  }}
                />
              </motion.span>
            )
          })}
        </motion.div>
      )}

      {/* Spinning sun rays when going to light */}
      {isGoingLight && (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ rotate: 0, scale: 0.8 }}
            animate={{ rotate: 180, scale: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative"
            style={{ width: 24, height: 24 }}
          >
            {/* Core */}
            <span
              className="absolute left-1/2 top-1/2"
              style={{
                transform: "translate(-50%, -50%)",
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: "#f59e0b",
                boxShadow: "0 0 8px rgba(245, 158, 11, 0.8)",
              }}
            />
            {/* Rays */}
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2
              const radius = 10
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius
              return (
                <span
                  key={`ray-${i}`}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${(angle * 180) / Math.PI}deg)`,
                    width: 8,
                    height: 2,
                    borderRadius: 9999,
                    background: i % 2 === 0 ? "#fde68a" : "#f59e0b",
                    opacity: 0.95,
                    boxShadow: "0 0 4px rgba(245,158,11,0.6)",
                  }}
                />
              )
            })}
          </motion.div>
        </motion.div>
      )}
    </button>
  )
}

const NavItems = ({ isNavOpen, setIsNavOpen }) => {
  const [isMobile, setIsMobile] = useState(false)

  const handleItemClick = () => {
    setIsNavOpen(false)
  }

  const handleSectionClick = (sectionIndex) => {
    if (typeof window !== "undefined" && window.fullpage_api) {
      window.fullpage_api.moveTo(sectionIndex)
    }
    setIsNavOpen(false)
  }

  const navVariant = {
    open: {
      clipPath: `circle(1920px at calc(100% - 40px) 40px)`,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    closed: {
      clipPath: "circle(0px at calc(100% - 120px) 35px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 30,
      },
    },
  }

  useEffect(() => {
    const updateScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Initial check and event listener
    updateScreenWidth()
    window.addEventListener("resize", updateScreenWidth)

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", updateScreenWidth)
    }
  }, [])

  // Check screen width and adjust clipPath for smaller screens
  if (isMobile) {
    navVariant.open = {
      clipPath: `circle(1920px at calc(100% - 40px) 40px)`,
      transition: {
        type: "tween",
      },
    }
    navVariant.closed = {
      clipPath: "circle(0px at calc(100% - 35px) 35px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    }
  } else {
    navVariant.open = {
      clipPath: `circle(2444px at calc(100% - 40px) 40px)`,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    }
    navVariant.closed = {
      clipPath: "circle(0px at calc(100% - 120px) 35px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    }
  }

  const itemVariants = {
    open: (custom) => ({
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        delay: custom,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    }),
    closed: {
      opacity: 0,
      x: -80,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  }

  return (
    <>
      <motion.div
        className={`fixed z-[45] w-full h-screen flex items-center justify-center backdrop-blur-sm transition-all ease duration-700 overflow-hidden`}
        variants={navVariant}
        animate={isNavOpen ? "open" : "closed"}
        initial={false}
      >
        <div className="relative backdrop-blur-sm opacity-95 flex flex-col items-center space-x-8 min-h-[100vh] bg-gray-700 dark:bg-gray-900 min-w-[100vw] ">
          <div className="flex flex-col items-center space-y-8 my-auto mx-0 z-50">
            {/* title */}
            <motion.h1
              variants={itemVariants}
              animate={isNavOpen ? "open" : "closed"}
              className="text-6xl font-bold text-white "
            >
              Menu
            </motion.h1>
            <div className="text-2xl font-bold text-white cursor-pointer" onClick={() => handleSectionClick(1)}>
              <motion.h2
                className="text-white"
                variants={itemVariants}
                animate={isNavOpen ? "open" : "closed"}
                custom={0.1}
              >
                Home
              </motion.h2>
            </div>
            <div onClick={() => handleSectionClick(2)} className="text-2xl font-bold text-white cursor-pointer">
              <motion.h2
                className="text-white"
                variants={itemVariants}
                animate={isNavOpen ? "open" : "closed"}
                custom={0.2}
              >
                About
              </motion.h2>
            </div>
            <div onClick={() => handleSectionClick(3)} className="text-2xl font-bold text-white cursor-pointer">
              <motion.h2
                className="text-white"
                variants={itemVariants}
                animate={isNavOpen ? "open" : "closed"}
                custom={0.3}
              >
                Projects
              </motion.h2>
            </div>
            <div onClick={() => handleSectionClick(4)} className="text-2xl font-bold text-white cursor-pointer">
              <motion.h2
                className="text-white"
                variants={itemVariants}
                animate={isNavOpen ? "open" : "closed"}
                custom={0.4}
              >
                Education
              </motion.h2>
            </div>
            <div onClick={() => handleSectionClick(5)} className="text-2xl font-bold text-white cursor-pointer">
              <motion.h2
                className="text-white"
                variants={itemVariants}
                animate={isNavOpen ? "open" : "closed"}
                custom={0.5}
              >
                Contact
              </motion.h2>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

const Navbar = () => {
  const navRef = useRef(null)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const router = useRouter()
  const { resolvedTheme, mounted } = useTheme()

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  const handleLogoClick = () => {
    if (window.location.pathname !== "/") {
      router.push("/").then(() => {
        setTimeout(() => {
          if (typeof window !== "undefined" && window.fullpage_api) {
            window.fullpage_api.moveTo(1)
          }
        }, 100)
      })
    } else {
      if (typeof window !== "undefined" && window.fullpage_api) {
        window.fullpage_api.moveTo(1)
      }
    }
  }

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <nav className="px-5 md:px-24 w-screen fixed backdrop-filter backdrop-blur-md inset-0 flex flex-row justify-between items-center h-16 z-50 bg-gray-900 dark:bg-gray-900">
        <div className="ml-2 md:ml-0">
          <div className="h-8 w-24 bg-gray-700 dark:bg-gray-700 animate-pulse rounded"></div>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <div className="w-10 h-10 bg-gray-700 dark:bg-gray-700 animate-pulse rounded-full"></div>
          <div className="flex flex-col space-y-1 justify-center items-center">
            <div className="w-7 h-0.5 bg-gray-700 dark:bg-gray-700 animate-pulse rounded-full"></div>
            <div className="w-7 h-0.5 bg-gray-700 dark:bg-gray-700 animate-pulse rounded-full"></div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      <nav
        ref={navRef}
         className="navbar px-5 md:px-24 w-screen fixed backdrop-filter backdrop-blur-md inset-0 flex flex-row justify-between items-center h-16 z-50"
         style={{
           backgroundColor: isNavOpen
             ? resolvedTheme === "light"
               ? "rgb(230, 230, 230)"
               : "rgba(31, 41, 55, 0.85)" // darker than body for contrast in dark mode
             : resolvedTheme === "light"
               ? "rgb(230, 230, 230)"
               : "rgba(17, 24, 39, 0.8)",
           transition: "background-color 0.1s ease",
         }}
      >
        <div>
          <div
            onClick={handleLogoClick}
            className="ml-2 md:ml-0 transition-all ease duration-200 cursor-pointer hover:opacity-80"
            style={{
              filter: isNavOpen 
                ? (resolvedTheme === "light" ? "brightness(0)" : "brightness(0) invert(1)")
                : (resolvedTheme === "light" ? "brightness(0)" : "invert(1)"),
            }}
          >
            <Image
              src={Logotype}
              alt="Destio Wahyu"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <LanguageToggle />
          <ThemeToggle isNavOpen={isNavOpen} />
          <button
            className="burger button flex flex-col justify-center items-center space-y-1"
            onClick={toggleNav}
            aria-label="Toggle menu"
            style={{
              marginTop: isNavOpen ? "-4px" : "0px",
              transition: "margin-top 0.2s ease",
            }}
          >
            <div
              className="w-7 h-0.5 rounded-full transition-all ease duration-200"
              style={{
                backgroundColor: isNavOpen 
                  ? (resolvedTheme === "light" ? "black" : "white")
                  : (resolvedTheme === "light" ? "black" : "white"),
                transform: isNavOpen ? "rotate(45deg) translateX(3px) translateY(4px)" : "rotate(0deg) translateY(0px)",
              }}
            ></div>
            <div
              className="w-7 h-0.5 rounded-full transition-all ease duration-200"
              style={{
                backgroundColor: isNavOpen 
                  ? (resolvedTheme === "light" ? "black" : "white")
                  : (resolvedTheme === "light" ? "black" : "white"),
                transform: isNavOpen ? "rotate(-45deg) translateY(-2px) translateX(-0px)" : "rotate(0deg) translateY(0px)",
              }}
            ></div>
          </button>
        </div>
      </nav>
      <NavItems isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
    </>
  )
}

export default Navbar
