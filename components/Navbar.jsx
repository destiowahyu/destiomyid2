"use client"
import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Logotype from "@/public/image/logotype.png"
import { useRouter } from "next/navigation"
import { useTheme } from "@/components/ThemeProvider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"
import LanguageToggle from "./LanguageToggle"

const ThemeToggle = ({ isNavOpen }) => {
  const { theme, setTheme, resolvedTheme, mounted } = useTheme()

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full">
        <div className="w-4 h-4"></div>
      </div>
    )
  }

  // Instant toggle - no dropdown
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  const currentIcon = theme === "light" ? faSun : faMoon

  return (
    <button
      className={`theme-toggle-btn flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200 
        ${isNavOpen ? "text-white" : resolvedTheme === "light" ? "text-black" : "text-white"}`}
      style={{ color: isNavOpen ? "#ffffff" : resolvedTheme === "light" ? "#000000" : "#ffffff" }}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <FontAwesomeIcon icon={currentIcon} className="w-4 h-4" />
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
      <nav className="px-5 md:px-24 w-screen fixed backdrop-filter backdrop-blur-md inset-0 flex flex-row justify-between items-center h-16 z-50 bg-gray-900">
        <div className="ml-2 md:ml-0">
          <div className="h-8 w-24 bg-gray-700 animate-pulse rounded"></div>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <div className="w-10 h-10 bg-gray-700 animate-pulse rounded-full"></div>
          <div className="flex flex-col space-y-1.5">
            <div className="w-10 h-1 bg-gray-700 animate-pulse rounded-full"></div>
            <div className="w-10 h-1 bg-gray-700 animate-pulse rounded-full"></div>
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
              ? "rgba(107, 114, 128, 0.5)"
              : "rgba(17, 24, 39, 0.5)" 
            : resolvedTheme === "light"
              ? "rgba(230, 230, 230, 0.8)"
              : "rgba(17, 24, 39, 0.8)",
          transition: "background-color 0.1s ease",
        }}
      >
        <div>
          <div
            onClick={handleLogoClick}
            className="ml-2 md:ml-0 transition-all ease duration-200 cursor-pointer hover:opacity-80"
            style={{
              filter: isNavOpen ? "brightness(0) invert(1)" : resolvedTheme === "dark" ? "invert(1)" : "none",
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
            className="burger button flex flex-col justify-center items-center space-y-1.5"
            onClick={toggleNav}
            aria-label="Toggle menu"
          >
            <div
              className="w-10 h-1 rounded-full transition-all ease duration-200"
              style={{
                backgroundColor: isNavOpen ? "white" : resolvedTheme === "light" ? "black" : "white",
                transform: isNavOpen ? "rotate(45deg) translateX(5px) translateY(7px)" : "rotate(0deg) translateY(0px)",
              }}
            ></div>
            <div
              className="w-10 h-1 rounded-full transition-all ease duration-200"
              style={{
                backgroundColor: isNavOpen ? "white" : resolvedTheme === "light" ? "black" : "white",
                transform: isNavOpen ? "rotate(-45deg) translateY(-2px) translateX(-1px)" : "rotate(0deg) translateY(0px)",
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
