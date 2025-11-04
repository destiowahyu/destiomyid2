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
import { faChevronLeft, faGlobe, faVideo, faLayerGroup } from "@fortawesome/free-solid-svg-icons"

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
  { id: 9, label: "Other", icon: faLayerGroup },
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
            x: 200,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            type: "spring",
          }}
          className="flex flex-row justify-center items-start flex-wrap gap-3 md:gap-5 my-5 "
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              animate={activeCategory === cat.id ? { scale: 1.03 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.7 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative inline-flex items-center gap-3 px-5 md:px-7 py-3 md:py-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none shadow-md ${
                activeCategory === cat.id
                  ? "bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 ring-2 ring-slate-400/50 shadow-lg"
                  : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 hover:dark:bg-gray-600"
              }`}
            >
              <FontAwesomeIcon icon={cat.icon} className="text-lg md:text-xl text-gray-700 dark:text-gray-200" />
              <span className="font-semibold tracking-wide text-base md:text-lg">{cat.label}</span>
              {activeCategory === cat.id && (
                <motion.span
                  layoutId="cat-underline"
                  className="absolute -bottom-1 left-4 right-4 h-1 rounded-full bg-gradient-to-r from-slate-500 to-slate-300 dark:from-slate-300 dark:to-slate-500"
                />
              )}
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
