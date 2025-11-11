"use client"
import ReactFullpage from "@fullpage/react-fullpage"
import Image from "next/legacy/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

// components
import Button from "@/components/Button"
import Destio from "@/public/image/des.jpg"
import Destio2 from "@/public/image/des2.jpg"
import Setup from "@/public/image/connect.jpg"
import ProjectAll from "@/public/image/projects.jpg"
import Hr from "@/components/Hr"

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faGraduationCap } from "@fortawesome/free-solid-svg-icons"

// Add this import at the top
import { useTheme } from "@/components/ThemeProvider"
import { useLanguage } from "@/components/LanguageProvider"
import translations from "@/json/translations.json"

// Cursor Trail Effect
const CursorTrail = () => {
  const [trail, setTrail] = useState([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now() + Math.random(),
      }

      setTrail((prevTrail) => {
        const newTrail = [newPoint, ...prevTrail]
        return newTrail.slice(0, 15) // Keep only last 15 points
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed pointer-events-none z-40"
          initial={{
            x: point.x - 4,
            y: point.y - 4,
            scale: 1,
            opacity: 0.8,
          }}
          animate={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: index * 0.05,
          }}
          style={{
            width: `${Math.max(2, 10 - index * 0.5)}px`,
            height: `${Math.max(2, 10 - index * 0.5)}px`,
            backgroundColor: `rgba(156, 163, 175, ${Math.max(0.1, 0.9 - index * 0.05)})`,
            borderRadius: "50%",
          }}
        />
      ))}
    </>
  )
}

// Free Moving Image Component
const FreeMovingImage = ({ children, className, ...props }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const imageRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // More sensitive and free movement calculation
    const mouseX = (e.clientX - centerX) / (rect.width * 0.3) // Increased sensitivity
    const mouseY = (e.clientY - centerY) / (rect.height * 0.3)

    setMousePosition({ x: mouseX, y: mouseY })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  // More dramatic and free movement
  const rotateX = isHovered ? mousePosition.y * -25 : 0 
  const rotateY = isHovered ? mousePosition.x * 25 : 0
  const translateX = isHovered ? mousePosition.x * 20 : 0
  const translateY = isHovered ? mousePosition.y * 20 : 0
  const scale = isHovered ? 1.08 : 1

  return (
    <motion.div
      ref={imageRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        translateX,
        translateY,
        scale,
      }}
      transition={{
        type: "spring",
        stiffness: 200, // Reduced stiffness for more fluid movement
        damping: 15, // Reduced damping for more bounce
      }}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

const MyPage = () => {
  const fullpageOptions = {
    anchors: ["home", "about", "projects", "education", "contact"],
    scrollingSpeed: 1000,
    licenseKey: "gplv3-license",
    menu: "#sidebar",
    lockAnchors: false,
  }

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
    });
    };

  // Add this inside the MyPage component, right after the fullpageOptions
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const t = translations[language]
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set loading to false after page loads
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

    useEffect(() => {
    const forceColors = () => {
        const allTextElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, div")
        allTextElements.forEach((element) => {
        if (resolvedTheme === "light") {
            if (
            !element.closest(".bg-gray-700") &&
            !element.closest(".bg-gray-800") &&
            !element.closest(".bg-gray-900")
            ) {
            element.style.color = "black" 
            }
        } else {
            element.style.color = "rgb(243, 244, 246)"
        }
        })
    }

    forceColors()
    setTimeout(forceColors, 100)
    setTimeout(forceColors, 500)
    }, [resolvedTheme])

    // Force contact section to have auto height
    useEffect(() => {
      const contactSection = document.querySelector('[data-contact-section]')
      if (!contactSection) return

      const enforceContactSectionHeight = () => {
        if (contactSection) {
          contactSection.style.setProperty('height', 'auto', 'important')
          contactSection.style.setProperty('min-height', '100vh', 'important')
          contactSection.style.setProperty('max-height', 'none', 'important')
        }
      }

      enforceContactSectionHeight()
      
      // Use MutationObserver to watch for style changes
      const observer = new MutationObserver(() => {
        enforceContactSectionHeight()
      })
      
      observer.observe(contactSection, {
        attributes: true,
        attributeFilter: ['style', 'class'],
        childList: false,
        subtree: false
      })
      
      // Also run periodically as backup
      const interval = setInterval(enforceContactSectionHeight, 200)
      
      // Run on resize
      window.addEventListener('resize', enforceContactSectionHeight)
      
      return () => {
        observer.disconnect()
        clearInterval(interval)
        window.removeEventListener('resize', enforceContactSectionHeight)
      }
    }, [])


  // Wireframe skeleton for initial load
  if (isLoading) {
    return (
      <div 
        className="fixed inset-0 bg-[rgb(230,230,230)] dark:bg-[rgb(17,24,39)] z-40"
        style={{
          backgroundColor: resolvedTheme === "light" ? "rgb(230, 230, 230)" : "rgb(17, 24, 39)"
        }}
      >
        <div className="mx-auto container grid grid-cols-1 md:grid-cols-3 gap-4 p-10 overflow-hidden md:px-20 pt-24">
          {/* Left content skeleton */}
          <div className="col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start space-y-6">
            {/* Mobile image skeleton */}
            <div className="block md:hidden w-60 h-60 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full"></div>
            {/* Title skeleton */}
            <div className="h-16 md:h-20 w-3/4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
            {/* Subtitle skeleton */}
            <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
            {/* Description skeleton */}
            <div className="space-y-2 w-full">
              <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
              <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
              <div className="h-4 w-4/5 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
            </div>
            {/* Buttons skeleton */}
            <div className="flex flex-row space-x-4 mt-10">
              <div className="h-12 w-32 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
              <div className="h-12 w-32 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
            </div>
          </div>
          {/* Right image skeleton */}
          <div className="hidden md:flex col-span-1 mx-auto justify-center items-center">
            <div className="w-80 h-96 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <CursorTrail />

      <ReactFullpage
        render={({ state, fullpageApi }) => (
          <ReactFullpage.Wrapper>
            <div className="section">
              <div className="mx-auto container grid grid-cols-1 md:grid-cols-3 gap-4 p-10 overflow-hidden md:px-20">
                <motion.div
                  className="col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start"
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                  }}
                >
                  <div className="block md:hidden col-span-1 mx-auto my-10">
                    <FreeMovingImage className="bg-slate-500 dark:bg-gray-600 rounded-full h-60 w-60 transition-all ease-out duration-500">
                      <Image
                        src={Destio || "/placeholder.svg"}
                        width={500}
                        height={500}
                        className="rounded-full w-full h-full object-cover object-[50%_20%]"
                        alt="Destio"
                        placeholder="blur"
                      />
                      
                    </FreeMovingImage>
                  </div>


                  <motion.h1
                    className="text-black dark:text-white text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold my-2 md:my-5"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.3,
                      type: "spring",
                    }}
                  >
                    {t.home.name}
                  </motion.h1>

                  <motion.h3
                    className="uppercase text-xl mb-3 font-normal text tracking-[.5rem] text-gray-500 dark:text-gray-400"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                    }}
                  >
                    {t.home.title}
                  </motion.h3>

                  <motion.p
                    className="title text-md  2xl:text-xl mt-4 tracking-wider text-gray-500 dark:text-gray-400 leading-[1.7rem] wipe-text"
                    data-wipe-on-lang
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.4,
                      type: "spring",
                    }}
                  >
                    {t.home.description}
                  </motion.p>
                  <motion.div
                    className="buttons flex flex-row justify-center items-center space-x-4 mt-10"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.5,
                      type: "spring",
                    }}
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variation="primary">
                        <Link href={"/docs/cv-destio.pdf"} target="_blank" rel="noopener noreferrer" download>
                          {t.home.downloadCV}
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variation="secondary">
                        <a href="#contact" className="text-gray-700 dark:text-gray-200">
                          {t.home.contactMe}
                        </a>
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
                <motion.div
                  className="hidden md:flex col-span-1 mx-auto justify-center items-center "
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.7,
                    type: "spring",
                  }}
                >
                  <FreeMovingImage className="rounded-full h-auto w-auto lg:px-12 transition-all ease-out duration-100">
                    <Image
                      src={Destio || "/placeholder.svg"}
                      width={400}
                      height={500}
                      placeholder="blur"
                      alt="Alvalens"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </FreeMovingImage>
                </motion.div>
              </div>
            </div>
            <div className="section">
              <div className="relative md:h-screen w-screen gap-4 flex justify-center items-center flex-col overflow-hidden">
                <div className="z-0 mb-48 md:mb-0  md:absolute top-1/4  md:right-[10%] md:-translate-y-16 ">
                  <motion.div
                    initial={{
                      x: 300,
                      opacity: 0,
                      z: -100,
                    }}
                    whileInView={{
                      x: 0,
                      opacity: 1,
                      z: 0,
                    }}
                    transition={{
                      delay: 0.5,
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                    }}
                  >
                    <FreeMovingImage className="relative bg-slate-300 dark:bg-gray-700 rounded-sm h-[400px] md:h-[600px] w-[80vw] md:w-[30vw] shadow-2xl overflow-hidden will-change-transform">
                      <Image
                        src={Destio2 || "/placeholder.svg"}
                        layout="fill"
                        className="object-cover"
                        alt="Destio"
                        placeholder="blur"
                      />
                      <div className="absolute inset-0 bg-black/0 dark:bg-black/30 pointer-events-none"></div>
                    </FreeMovingImage>
                  </motion.div>
                </div>
                <div className="z-10 w-full absolute md:w-auto  md:left-[10%] top-[55%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 py-5">
                    <motion.h1
                    className="bg-[rgb(230,230,230)] dark:bg-[rgb(17,24,39)] px-3 md:px-0 text-black dark:text-white text-5xl md:text-8xl font-bold wipe-text"
                    data-wipe-on-lang
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                        delay: 0.1,
                        type: "spring",
                    }}
                    >
                    {t.about.title}
                    </motion.h1>

                  <Hr />
                  <motion.p
                    className="title  text-xl mt-4 tracking-wider text-gray-500 dark:text-gray-400 leading-[1.7rem] mb-5"
                    data-fade-on-lang
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                    }}
                  >
                    {t.about.description}
                  </motion.p>
                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.3,
                      type: "spring",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variation="primary">
                      <Link href="/about">{t.about.learnMore}</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="relative h-screen w-screen gap-4 p-6 md:p-10 flex justify-center items-center flex-col overflow-hidden">
                <div className="z-0 mb-48 md:mb-0  md:absolute top-1/4  md:right-[10%] md:-translate-y-16 ">
                  <motion.div
                    initial={{
                      x: 300,
                      opacity: 0,
                      z: -100,
                    }}
                    whileInView={{
                      x: 0,
                      opacity: 1,
                      z: 0,
                    }}
                    transition={{
                      delay: 0.5,
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                    }}
                  >
                    <FreeMovingImage className="relative bg-slate-300 dark:bg-gray-700 rounded-sm h-[400px] md:h-[600px] w-[80vw] md:w-[30vw] shadow-2xl overflow-hidden">
                      <Image
                        src={ProjectAll || "/placeholder.svg"}
                        layout="fill"
                        className="object-cover pointer-events-none"
                        alt="Destio Projects"
                        placeholder="blur"
                      />
                      <div className="absolute inset-0 bg-black/0 dark:bg-black/50"></div>
                    </FreeMovingImage>
                  </motion.div>
                </div>
                <div className="z-10 w-full absolute md:w-auto  md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 py-5">
                  <motion.h1
                    className="bg-[rgb(230,230,230)] dark:bg-[rgb(17,24,39)] px-3 md:px-0 text-black dark:text-white text-5xl md:text-8xl font-bold wipe-text"
                    data-wipe-on-lang
                    data-i18n-en={translations.en.projects.title}
                    data-i18n-id={translations.id.projects.title}
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                    }}
                  >
                    {t.projects.title}
                  </motion.h1>
                  <Hr />
                  <motion.p
                    className="title  text-xl mt-4 tracking-wider text-gray-500 dark:text-gray-400 leading-[1.7rem] mb-5"
                    data-fade-on-lang
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                    }}
                  >
                    {t.projects.description}{" "}
                    <span className="bg-gray-300 dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-50 px-2 py-1 rounded text-black dark:text-white">
                      {t.projects.currentlyWorking}
                    </span>
                  </motion.p>
                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.3,
                      type: "spring",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variation="primary">
                      <Link href="/projects">{t.projects.learnMore}</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="relative h-screen w-screen gap-4 p-6 md:p-10 flex justify-center items-center flex-col overflow-hidden">
                <div className="hidden md:block md:mb-0  md:absolute top-1/4  md:right-[10%] md:-translate-y-16 ">
                  <motion.div
                    initial={{
                      x: 300,
                      opacity: 0,
                      z: -100,
                    }}
                    whileInView={{
                      x: 0,
                      opacity: 1,
                      z: 0,
                    }}
                    transition={{
                      delay: 0.5,
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                    }}
                  >


                  </motion.div>
                </div>
                <div className="z-10 w-full md:w-auto md:left-[10%] md:top-1/3 col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start px-10 py-5">
                  <motion.h1
                    className="bg-[rgb(230,230,230)] dark:bg-[rgb(17,24,39)] px-3 md:px-0 text-black dark:text-white text-4xl md:text-8xl font-bold wipe-text"
                    data-wipe-on-lang
                    data-i18n-en={translations.en.education.title}
                    data-i18n-id={translations.id.education.title}
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                    }}
                  >
                    {t.education.title}
                  </motion.h1>
                  <Hr />
                  <motion.p
                    className="title text-base md:text-xl mt-4 tracking-wider text-gray-500 dark:text-gray-400 leading-[1.7rem] mb-6 md:mb-8"
                    data-fade-on-lang
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                    }}
                  >
                    {t.education.description}{" "}
                    <span className="bg-gray-300 dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-50 px-2 py-1 rounded text-black dark:text-white">
                      {" "}
                      {t.education.academicAchievements}
                    </span>
                  </motion.p>
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.3,
                      type: "spring",
                    }}
                  >
                    <div className="bg-gray-100  dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:transform hover:scale-105">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-700 dark:bg-gray-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <FontAwesomeIcon icon={faGraduationCap} className="text-white text-lg md:text-xl" />
                        </div>
                        <div className="flex flex-col items-start">
                          <h3 className="text-xl font-bold text-black dark:text-white text-left">{t.education.university}</h3>
                          <p className="text-gray-600 dark:text-gray-400 font-medium text-left">{t.education.universityPeriod}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">
                        {t.education.degree}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{t.education.gpa}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {t.education.universityDescription}
                      </p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:transform hover:scale-105">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-700 dark:bg-gray-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <FontAwesomeIcon icon={faGraduationCap} className="text-white text-lg md:text-xl" />
                        </div>
                        <div className="flex flex-col items-start">
                          <h3 className="text-xl font-bold text-black dark:text-white text-left">{t.education.highSchool}</h3>
                          <p className="text-gray-600 dark:text-gray-400 font-medium text-left">{t.education.highSchoolPeriod}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">{t.education.major}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {t.education.highSchoolDescription}
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="mt-8"
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.4,
                      type: "spring",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variation="primary">
                      <Link href="/about">{t.education.learnMore}</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="section" data-contact-section>
              <div className="relative md:min-h-screen w-screen gap-4 p-10 md:pb-20 flex justify-center items-center flex-col overflow-hidden md:overflow-visible">
                <div className="z-0 mb-48 md:mb-0  md:absolute top-1/4  md:right-[10%] md:-translate-y-16 ">
                  <motion.div
                    initial={{
                      x: 300,
                      opacity: 0,
                      z: -100,
                    }}
                    whileInView={{
                      x: 0,
                      opacity: 1,
                      z: 0,
                    }}
                    transition={{
                      delay: 0.5,
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                    }}
                  >
                    <FreeMovingImage className="bg-slate-300 dark:bg-gray-700 rounded-sm h-[400px] md:h-[600px] w-[80vw] md:w-[30vw] shadow-2xl overflow-hidden">
                      <Image
                        src={Setup || "/placeholder.svg"}
                        layout="fill"
                        className="object-cover"
                        alt="Destio Setup"
                        placeholder="blur"
                      />
                    </FreeMovingImage>
                  </motion.div>
                </div>
                <div className="z-10 w-full absolute md:w-auto  md:left-[10%] top-[48%] md:top-1/4 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 py-5 md:pb-48">
                  <motion.h1
                    className="bg-[rgb(230,230,230)] dark:bg-[rgb(17,24,39)] px-3 py-2 md:px-0 md:py-0 text-black dark:text-white text-5xl md:text-8xl font-bold mb-2 wipe-text"
                    data-wipe-on-lang
                    data-i18n-en={translations.en.contact.title}
                    data-i18n-id={translations.id.contact.title}
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                    }}
                  >
                    {t.contact.title}
                  </motion.h1>
                  <Hr />
                  <motion.p
                    className="title text-xl mt-4 tracking-wider text-gray-500 dark:text-gray-400 leading-[1.7rem] md:mb-5"
                    data-fade-on-lang
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                    }}
                  >
                    {t.contact.description}{" "}
                    <span className="bg-gray-300 dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-50 px-2 py-1 rounded text-black dark:text-white">
                      {t.contact.contactText}
                    </span>
                  </motion.p>
                  <motion.p
                    className="title text-xl mt-4 tracking-wider text-gray-500 dark:text-gray-400 leading-[1.7rem] mb-5"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.3,
                      type: "spring",
                    }}
                  >
                    <a href="mailto:destiowahyu@gmail.com?subject=Hello&body=Hello Destio,">
                      {t.contact.email}
                    </a>
                  </motion.p>
                  <div className="flex justify-center items-center space-x-4 mb-8 md:mb-16">
                    <motion.a
                      href="mailto:destiowahyu@gmail.com?subject=Hello&body=Hello Destio,"
                      className="flex justify-center items-center bg-gray-700 w-14 h-14 rounded-full text-gray-100 hover:bg-gray-400 hover:scale-110 transition-all ease-out duration-300"
                      initial={{ y: 40, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{
                        y: { delay: 0.1 },
                        opacity: { delay: 0.2 },
                      }}
                    >
                      <FontAwesomeIcon icon={faEnvelope} className="text-3xl" />
                    </motion.a>

                    <motion.a
                      href="https://www.instagram.com/destiowahyu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center items-center bg-gray-700 w-14 h-14 rounded-full text-gray-100 hover:bg-gray-400 hover:scale-110 transition-all ease-out duration-300"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        y: { delay: 0.3 },
                        opacity: { delay: 0.4 },
                      }}
                    >
                      <FontAwesomeIcon icon={faInstagram} className="text-3xl" />
                    </motion.a>

                    <motion.a
                      href="https://github.com/destiowahyu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center items-center bg-gray-700 w-14 h-14 rounded-full text-gray-100 hover:bg-gray-400 hover:scale-110 transition-all ease-out duration-300"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        y: { delay: 0.2 },
                        opacity: { delay: 0.3 },
                      }}
                    >
                      <FontAwesomeIcon icon={faGithub} className="text-3xl" />
                    </motion.a>

                    <motion.a
                      href="https://www.linkedin.com/in/destiowahyu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center items-center bg-gray-700 w-14 h-14 rounded-full text-gray-100 hover:bg-gray-400 hover:scale-110 transition-all ease-out duration-300"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        y: { delay: 0.4 },
                        opacity: { delay: 0.5 },
                      }}
                    >
                      <FontAwesomeIcon icon={faLinkedin} className="text-3xl" />
                    </motion.a>

                  </div>
                </div>
              </div>
            </div>
          </ReactFullpage.Wrapper>
        )}
        {...fullpageOptions}
      />
    </div>
  )
}

export default MyPage
