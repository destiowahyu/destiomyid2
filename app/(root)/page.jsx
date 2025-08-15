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
import Setup from "@/public/image/setup.jpg"
import ProjectAll from "@/public/image/projects.png"
import Hr from "@/components/Hr"

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faGraduationCap } from "@fortawesome/free-solid-svg-icons"

// Add this import at the top
import { useTheme } from "@/components/ThemeProvider"

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
  const rotateX = isHovered ? mousePosition.y * -25 : 0 // Increased rotation
  const rotateY = isHovered ? mousePosition.x * 25 : 0
  const translateX = isHovered ? mousePosition.x * 20 : 0 // Increased translation
  const translateY = isHovered ? mousePosition.y * 20 : 0
  const scale = isHovered ? 1.08 : 1 // Slightly more scale

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
            element.style.color = "black" // HAPUS BARIS INI
            }
        } else {
            element.style.color = "rgb(243, 244, 246)" // HAPUS JUGA BARIS INI
        }
        })
    }

    forceColors()
    setTimeout(forceColors, 100)
    setTimeout(forceColors, 500)
    }, [resolvedTheme])


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
                    Destio Wahyu Lanio
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
                    Video Editor, Web Developer, Musician
                  </motion.h3>

                  <motion.p
                    className="title text-md  2xl:text-xl mt-4 tracking-wider text-gray-500 dark:text-gray-400 leading-[1.7rem]"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.4,
                      type: "spring",
                    }}
                  >
                    Hi! I&apos;m Destio, an Informatics Engineering graduate focused on Software Engineering and web
                    development. Beyond coding, I enjoy video editing and music as creative hobbies, combining both my
                    technical knowledge and artistic side to craft engaging digital projects.
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
                        <Link href={"/docs/cv.pdf"} target="_blank" rel="noopener noreferrer" download>
                          Download CV
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variation="secondary">
                        <a href="#contact" className="text-gray-700 dark:text-gray-200">
                          Contact Me
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
                <div className="z-10 w-full absolute md:w-auto  md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 py-5">
                    <motion.h1
                    className="dark:bg-[rgb(17,24,39)] lg:bg-transparent dark:lg:bg-transparent px-3 md:px-0 text-black dark:text-white text-5xl md:text-8xl font-bold"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                        delay: 0.1,
                        type: "spring",
                    }}
                    >
                    About Me
                    </motion.h1>

                  <Hr />
                  <motion.p
                    className="title  text-xl mt-4 tracking-wider text-gray-500 dark:text-gray-400 leading-[1.7rem] mb-5"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                    }}
                  >
                    A brief introduction about me and my interest.
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
                      <Link href="/about">Learn More</Link>
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
                        alt="Alvalens Projects"
                        placeholder="blur"
                      />
                      <div className="absolute inset-0 bg-black/0 dark:bg-black/50"></div>
                    </FreeMovingImage>
                  </motion.div>
                </div>
                <div className="z-10 w-full absolute md:w-auto  md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 py-5">
                  <motion.h1
                    className="dark:bg-[rgb(17,24,39)] dark:bg-gray-800 lg:bg-transparent dark:lg:bg-transparent bg-opacity-50 px-3 md-px-0 text-black dark:text-white text-5xl md:text-8xl font-bold"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                    }}
                  >
                    My Projects
                  </motion.h1>
                  <Hr />
                  <motion.p
                    className="title  text-xl mt-4 tracking-wider text-gray-500 dark:text-gray-400 leading-[1.7rem] mb-5"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                    }}
                  >
                    This is some of my projects that I have done{" "}
                    <span className="bg-gray-300 dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-50 px-2 py-1 rounded text-black dark:text-white">
                      and currently working on.
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
                      <Link href="/projects">Learn More</Link>
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
                <div className="z-10 w-full md:w-auto md:left-[10%] md:top-1/3 col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start px-6 py-5">
                  <motion.h1
                    className="dark:bg-[rgb(17,24,39)] dark:bg-gray-800 lg:bg-transparent dark:lg:bg-transparent bg-opacity-50 px-3 md-px-0 text-black dark:text-white text-4xl md:text-8xl font-bold"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                    }}
                  >
                    Education
                  </motion.h1>
                  <Hr />
                  <motion.p
                    className="title text-base md:text-xl mt-4 tracking-wider text-gray-500 dark:text-gray-400 leading-[1.7rem] mb-6 md:mb-8"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                    }}
                  >
                    My educational journey and{" "}
                    <span className="bg-gray-300 dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-50 px-2 py-1 rounded text-black dark:text-white">
                      {" "}
                      academic achievements.
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
                        <div className="w-12 h-12 bg-gray-700 dark:bg-gray-600 rounded-full flex items-center justify-center mr-4">
                          <FontAwesomeIcon icon={faGraduationCap} className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-black dark:text-white">Universitas Dian Nuswantoro</h3>
                          <p className="text-gray-600 dark:text-gray-400 font-medium">2021 - 2025</p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">
                        Bachelor of Computer Science
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">GPA: 3.73/4.00</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Graduated with a degree in Informatics Engineering, specializing in Software Engineering, and particularly passionate about web development.
                      </p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:transform hover:scale-105">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-700 dark:bg-gray-600 rounded-full flex items-center justify-center mr-4">
                          <FontAwesomeIcon icon={faGraduationCap} className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-black dark:text-white">SMAN 1 Rembang</h3>
                          <p className="text-gray-600 dark:text-gray-400 font-medium">2018 - 2021</p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">Science Major</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Graduated with excellent academic performance and active in various school activities.
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
                      <Link href="/about">Learn More</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="relative md:h-screen w-screen  gap-4 p-10 flex justify-center items-center flex-col overflow-hidden">
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
                <div className="z-10 w-full absolute md:w-auto  md:left-[10%] top-[50%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 overflow-hidden">
                  <motion.h1
                    className="dark:bg-[rgb(17,24,39)] dark:bg-gray-800 lg:bg-transparent dark:lg:bg-transparent bg-opacity-50 px-3 md-px-0 text-black dark:text-white text-5xl md:text-8xl font-bold mb-2"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                    }}
                  >
                    Let&apos;s connect
                  </motion.h1>
                  <Hr />
                  <motion.p
                    className="title text-xl mt-4 tracking-wider text-gray-500 dark:text-gray-400 leading-[1.7rem] md:mb-5"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                    }}
                  >
                    Feel free to contact me if you have any{" "}
                    <span className="bg-gray-300 dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-50 px-2 py-1 rounded text-black dark:text-white">
                      questions or just want to say hi.
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
                      destiowahyu@gmail.com
                    </a>
                  </motion.p>
                  <div className="flex justify-center items-center space-x-4">
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
