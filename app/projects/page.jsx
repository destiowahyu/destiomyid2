"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import Button from "@/components/Button"
import Image from "next/legacy/image" // Changed to next/legacy/image

// images
import Intervyou1 from "@/public/image/projects/web/intervyou/intervyou-1.png"
import Intervyou2 from "@/public/image/projects/web/intervyou/intervyou-2.png"
import Intervyou3 from "@/public/image/projects/web/intervyou/intervyou-3.png"
import ProjectAll from "@/public/image/projects.jpg"

import Hr from "@/components/Hr"
import ProjectCard from "./components/ProjectCard"
import Projects from "@/json/data.json"
import FixedButon from "@/components/FixedButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faGlobe, faVideo, faLayerGroup, faMobileAlt, faEllipsisH } from "@fortawesome/free-solid-svg-icons"

// Re-defining AnimatedImage here for clarity, but ideally it would be a shared component
function AnimatedImage({ src, alt, width, height, className }) {
  const [hovered, setHovered] = useState(false)
  const [xy, setXY] = useState([0, 1])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height
    const rotate = ((x - centerX) / centerX) * 10 // -10deg to 10deg
    const zoom = 1.08 + ((y - centerY) / centerY) * 0.02
    setXY([rotate, zoom])
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setXY([0, 1])
  }

  return (
    <motion.div
      style={{ transformOrigin: "bottom" }}
      initial={{ scale: 1, rotate: 0 }}
      animate={hovered ? { scale: xy[1], rotate: xy[0] } : { scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.5,
        ease: "easeOut",
        duration: 0.3,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`${className || "w-full h-full"} hover:shadow-2xl hover:shadow-black/20 transition-all duration-500 ease-out`}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        layout={width && height ? undefined : "fill"}
        className={className}
        objectFit="cover"
        placeholder="blur"
      />
    </motion.div>
  )
}

const categories = [
  { id: 1, label: "Web Development", icon: faGlobe },
  { id: 2, label: "Video Editing", icon: faVideo },
  { id: 3, label: "Mobile Apps", icon: faMobileAlt },
  { id: 9, label: "Other", icon: faEllipsisH },
  { id: 10, label: "All", icon: faLayerGroup },
]

export default function Page() {
  const [activeCategory, setActiveCategory] = useState(1)
  const projects = Projects.Projects.filter((item) => item.show === true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <main className="overflow-hidden">
        <FixedButon href="/#projects">
          <FontAwesomeIcon icon={faChevronLeft} className="text-black dark:text-white pr-10" />
        </FixedButon>
        <div className="relative h-screen w-screen  gap-4 p-10 flex justify-center items-center flex-col mb-10 overflow-hidden">
          <div className="z-0 mb-48 md:mb-0  md:absolute top-1/4  md:right-[10%] md:-translate-y-16 ">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.6 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="relative bg-slate-300 dark:bg-gray-700 rounded-sm h-[400px] md:h-[600px] w-[80vw] md:w-[30vw] shadow-2xl overflow-hidden"
            >
              <AnimatedImage src={ProjectAll} alt="Destio" layout="fill" objectFit="cover" placeholder="blur" />
              <div className="absolute inset-0 bg-black/0 dark:bg-black/10 pointer-events-none" />
            </motion.div>
          </div>
          <div className="z-10 w-full absolute md:w-auto md:left-[10%] top-[65%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 pt-4 md:pt-0">
            <h1 className="bg-[rgb(230,230,230)] dark:bg-[rgb(17,24,39)] px-3 md:px-0 text-black dark:text-white text-5xl md:text-8xl font-bold">
              My Projects
            </h1>
            <Hr />
            <p className="title text-xl mt-4 tracking-wider text-gray-500 dark:text-gray-400 leading-[1.7rem] mb-5">
              List of my projects that I have done and{" "}
              <span className="bg-gray-300 dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-50 px-2 py-1 rounded text-black dark:text-white">
                {" "}
                currently working on.
              </span>
            </p>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              onClick={() => {
                window.scrollTo({
                  top: 1000,
                  behavior: "smooth",
                })
              }}
              className="mb-3"
            >
              <Button variation="primary">Scroll Down</Button>
            </motion.div>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
          <div className="flex justify-center items-center flex-col my-5 self-start ">
            <Hr variant="long"></Hr>
            <h1 className="text-3xl font-bold mt-3">Hightlight</h1>
          </div>
        </div>
        <div className="relative w-screen mx-auto container gap-4 px-10 grid grid-cols-1 md:grid-cols-2 mb-10">
          <div className="flex justify-center items-start flex-col mb-5 ">
            <div className="images relative w-full  aspect-square">
              <div className="absolute top-28 left-10 h-[40%]  aspect-video z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, x: 100 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  }}
                  className="w-full h-full shadow-lg"
                >
                  <AnimatedImage
                    src={Intervyou1}
                    alt="Intervyou AI Screenshot 1"
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    className="rat"
                  />
                </motion.div>
              </div>
              <div className="absolute top-10 right-28 h-[30%]  aspect-video">
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                    x: -100,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  }}
                  transition={{ delay: 0.3 }}
                  className="w-full h-full shadow-lg "
                >
                  <AnimatedImage
                    src={Intervyou3}
                    alt="Intervyou AI Screenshot 3"
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    objectPosition="0% 0%"
                  />
                </motion.div>
              </div>
              <div className="absolute bottom-10 md:bottom-26 right-20 h-[35%]  aspect-video">
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                    x: -100,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.5,
                  }}
                  className="w-full h-full shadow-lg"
                >
                  <AnimatedImage
                    src={Intervyou2}
                    alt="Intervyou AI Screenshot 2"
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                  />
                </motion.div>
              </div>
            </div>
          </div>
          <motion.div
            className="flex justify-center items-start flex-col mb-5 md:px-10"
            initial={{
              opacity: 0,
              x: 200,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.5,
              type: "spring",
            }}
          >
            <h2 className="text-2xl font-bold tracking-wider mb-3">Intervyou AI</h2>
            <p className="text-gray-600 text-justify title text-lg">
              AI Based interview Preparation Website created to help fresh graduates and job seekers prepare for
              interviews and optimize their CV through AI-powered features. The website is built using Next.js,
              TypeScript, Tailwind CSS, Shadcn UI, Prisma, and MySQL (TiDB). This website can comprehensively analyze
              the user&apos;s interview performance by providing a analysis of the user&apos;s answer, gesture, and
              material recommendation to improve the user&apos;s interview skills.
            </p>{" "}
            <div className="mt-3">
              <Button variation="primary">
                <Link href="projects/intervyou">More</Link>
              </Button>
              <Button variation="secondary">
                <a href="https://www.intervyou.me" target="_blank" rel="noopener noreferrer">
                  Preview
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="mt-16 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
          <div className="flex justify-center items-center flex-col my-5 self-start">
            <Hr variant="long"></Hr>
            <motion.h1
              className="text-3xl font-bold mt-3"
              initial={{
                opacity: 0,
                x: -200,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.7,
                type: "spring",
              }}
            >
              Other Note Worthy Projects
            </motion.h1>
          </div>
        </div>

        {/* choose category */}
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          className="flex flex-row justify-center items-center flex-wrap gap-4 md:gap-6 mt-8 mb-12 md:mb-16 px-4 md:px-10"
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 150 }}
              whileHover={{ 
                y: -8, 
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 17 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`group relative inline-flex items-center justify-center gap-3 px-6 md:px-8 py-4 md:py-5 rounded-2xl md:rounded-3xl cursor-pointer select-none overflow-hidden transition-all duration-500 ${
                activeCategory === cat.id
                  ? "shadow-2xl shadow-slate-500/30 dark:shadow-slate-900/50 bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-pink-50/80 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20"
                  : "shadow-lg shadow-gray-400/20 dark:shadow-black/30 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/80 dark:to-gray-700/80"
              }`}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: activeCategory === cat.id
                    ? "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 50%, rgba(236, 72, 153, 0.2) 100%)"
                    : "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)",
                }}
                animate={
                  activeCategory === cat.id
                    ? {
                        background: [
                          "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 50%, rgba(236, 72, 153, 0.2) 100%)",
                          "linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 50%, rgba(99, 102, 241, 0.2) 100%)",
                          "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 50%, rgba(236, 72, 153, 0.2) 100%)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              {/* Glassmorphism border effect */}
              <div
                className={`absolute inset-0 rounded-2xl md:rounded-3xl transition-all duration-500 pointer-events-none ${
                  activeCategory === cat.id
                    ? "border-2 border-indigo-300/60 dark:border-purple-400/40 backdrop-blur-md bg-white/20 dark:bg-white/5 ring-2 ring-purple-200/50 dark:ring-purple-500/20"
                    : "border-2 border-gray-300/60 dark:border-gray-600/60 backdrop-blur-sm bg-white/10 dark:bg-gray-800/20"
                }`}
              />

              {/* Shine effect on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)",
                  transform: "translateX(-100%)",
                }}
                animate={{
                  transform: activeCategory === cat.id 
                    ? ["translateX(-100%)", "translateX(200%)"]
                    : "translateX(-100%)",
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />

              {/* Icon container with glow effect */}
              <motion.div
                className={`relative z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 dark:shadow-purple-400/60"
                    : "bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-800 group-hover:from-indigo-400 group-hover:to-purple-400 dark:group-hover:from-indigo-500 dark:group-hover:to-purple-500 group-hover:shadow-lg group-hover:shadow-indigo-500/30 dark:group-hover:shadow-purple-500/40"
                }`}
                animate={
                  activeCategory === cat.id
                    ? {
                        rotate: [0, 5, -5, 5, 0],
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.span
                  animate={
                    activeCategory === cat.id
                      ? {
                          y: [0, -4, 0],
                          rotate: [0, 10, -10, 0],
                        }
                      : {}
                  }
                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                >
                  <FontAwesomeIcon 
                    icon={cat.icon} 
                    className={`text-lg md:text-xl transition-colors duration-300 ${
                      activeCategory === cat.id
                        ? "text-white"
                        : "text-gray-700 dark:text-gray-200 group-hover:text-white"
                    }`} 
                  />
                </motion.span>

                {/* Pulse effect for active category */}
                {activeCategory === cat.id && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-white/30"
                    animate={{
                      scale: [1, 1.5, 1.5],
                      opacity: [0.5, 0, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
              </motion.div>

              {/* Label with gradient text for active state */}
              <span
                className={`relative z-10 font-bold tracking-wide text-base md:text-lg transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
                    : "text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white"
                }`}
              >
                {cat.label}
              </span>

              {/* Active indicator - animated dot */}
              {activeCategory === cat.id && (
                <>
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white/50"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>

                  {/* Bottom glow line */}
                  <motion.div
                    layoutId="bottomGlow"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                </>
              )}

              {/* Decorative corner accents */}
              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          ))}
        </motion.div>

        {/* projects */}
        <div className="w-screen mx-auto container gap-4 px-10 grid grid-cols-1 md:grid-cols-2 mb-10 cursor-pointer">
          {projects.map((project, index) => (
            <ProjectCard project={project} key={index} activeCategory={activeCategory} />
          ))}
        </div>

        {/* view in archive btn */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          className="flex justify-center items-center flex-col my-5 self-start "
        >
          <Button variation="primary">
            <Link href="projects/archive">View In Archive</Link>
          </Button>
        </motion.div>
      </main>
    </>
  )
}
