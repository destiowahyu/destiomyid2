// Copyright (C) 2025 Destio Wahyu
// This file is part of Destio-portfolio-nextJs.
// Licensed under the GNU GPL v3.0. See LICENSE for details.

"use client"
import ReactFullpage from "@fullpage/react-fullpage"
import Image from "next/legacy/image"
// import "../globals.css";
import { motion } from "framer-motion"
import Link from "next/link"
// No need for useState for hovered/xy if AnimatedImage is removed
// components
import Button from "@/components/Button"
import Me from "@/public/image/des.jpg"
import MeMobile from "@/public/image/des2.jpg"
import MeAbout from "@/public/image/me2.jpg"
import Setup from "@/public/image/setup.jpg"
import ProjectAll from "@/public/image/projects.png"
import Hr from "@/components/Hr"
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faGraduationCap } from "@fortawesome/free-solid-svg-icons"

// Removed the AnimatedImage component definition entirely

const MyPage = () => {
  const fullpageOptions = {
    anchors: ["home", "about", "projects", "education", "contact"],
    scrollingSpeed: 1000,
    licenseKey: "YOUR_KEY_HERE",
    menu: "#sidebar",
    lockAnchors: false,
  }

  return (
    <div>
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
                    <div className="bg-slate-500 rounded-full h-60 w-60 transition-all ease-out duration-500">
                      <Image
                        src={MeMobile || "/placeholder.svg"}
                        width={500}
                        height={500}
                        className="rounded-full w-full h-full object-cover"
                        alt="Destio"
                        placeholder="blur"
                      />
                    </div>
                  </div>

                  <motion.h1
                    className="text-black text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold my-2 md:my-5"
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
                    className="uppercase text-xl mb-3 font-normal text tracking-[.5rem] text-gray-500"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                    }}
                  >
                    Video Editor, Musician, Web Developer
                  </motion.h3>

                  <motion.p
                    className="title text-md  2xl:text-xl mt-4 tracking-wider text-gray-500 leading-[1.7rem]"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.4,
                      type: "spring",
                    }}
                  >
                    Hi! I'm Destio, an Informatics Engineering graduate focused on Software Engineering and web
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
                    <Button variation="primary">
                      <Link href={"/docs/cv.pdf"} target="_blank" rel="noopener noreferrer" download>
                        Download CV
                      </Link>
                    </Button>
                    <Button variation="secondary">
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined" && window.fullpage_api) {
                            window.fullpage_api.moveTo(5)
                          }
                        }}
                        className="w-full h-full"
                      >
                        Contact Me
                      </button>
                    </Button>
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
                  <div className="rounded-full h-auto w-auto lg:px-12 transition-all ease-out duration-100">
                    {/* This image is fine as it's not the one causing issues */}
                    <Image
                      src={Me || "/placeholder.svg"}
                      width={400}
                      height={550}
                      placeholder="blur"
                      alt="Destio"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="section">
              <div className="relative md:h-screen w-screen gap-4 flex justify-center items-center flex-col overflow-hidden">
                <div className="z-0 mb-48 md:mb-0  md:absolute top-1/4  md:right-[10%] md:-translate-y-16 ">
                  <motion.div
                    className="bg-slate-300 rounded-sm h-[400px] md:h-[600px] w-[80vw] md:w-[30vw]" // Removed transition-all
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
                    <Image
                      src={MeAbout || "/placeholder.svg"}
                      layout="fill"
                      className="object-cover"
                      alt="Destio"
                      placeholder="blur"
                    />
                  </motion.div>
                </div>
                <div className="z-10 w-full absolute md:w-auto  md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 py-5">
                  <motion.h1
                    className="bg-white lg:bg-transparent bg-opacity-50 px-3 md-px-0 text-black text-5xl md:text-8xl font-bold"
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
                    className="title  text-xl mt-4 tracking-wider text-gray-500 leading-[1.7rem] mb-5"
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
                  >
                    <Button variation="primary">
                      <Link href="/about" className="w-full h-full flex items-center justify-center">
                        Learn More
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="relative md:h-screen w-screen gap-4 p-10 flex justify-center items-center flex-col overflow-hidden">
                <div className="z-0 mb-48 md:mb-0  md:absolute top-1/4  md:right-[10%] md:-translate-y-16 ">
                  <motion.div
                    className="bg-slate-300 rounded-sm h-[400px] md:h-[600px] w-[80vw] md:w-[30vw]" // Removed transition-all
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
                    <Image
                      src={ProjectAll || "/placeholder.svg"}
                      layout="fill"
                      className="object-cover"
                      alt="Destio Projects"
                      placeholder="blur"
                    />
                  </motion.div>
                </div>
                <div className="z-10 w-full absolute md:w-auto  md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 py-5">
                  <motion.h1
                    className="bg-white lg:bg-transparent bg-opacity-50 px-3 md-px-0 text-black text-5xl md:text-8xl font-bold"
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
                    className="title  text-xl mt-4 tracking-wider text-gray-500 leading-[1.7rem] mb-5"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                    }}
                  >
                    This is some of my projects that I have done{" "}
                    <span className="bg-transparent md:bg-gray-100 bg-opacity-50 xl:bg-transparent">
                      {" "}
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
                  >
                    <Button variation="primary">
                      <Link href="/projects" className="w-full h-full flex items-center justify-center">
                        Learn More
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="relative md:h-screen w-screen gap-4 p-10 flex justify-center items-center flex-col overflow-hidden">
                <div className="z-10 w-full md:w-auto md:left-[10%] md:top-1/3 col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start px-10 py-5">
                  <motion.h1
                    className="bg-white lg:bg-transparent bg-opacity-50 px-3 md-px-0 text-black text-5xl md:text-8xl font-bold"
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
                    className="title text-xl mt-4 tracking-wider text-gray-500 leading-[1.7rem] mb-8"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                    }}
                  >
                    My educational journey and{" "}
                    <span className="bg-transparent md:bg-gray-100 bg-opacity-50 xl:bg-transparent">
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
                    <div className="bg-white bg-opacity-80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:transform hover:scale-105">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                          <FontAwesomeIcon icon={faGraduationCap} className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-black">Universitas Negeri Malang</h3>
                          <p className="text-gray-600 font-medium">2021 - Present</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2 font-semibold">Bachelor of Computer Science</p>
                      <p className="text-gray-600 mb-2">GPA: 3.85/4.00</p>
                      <p className="text-gray-600 text-sm">
                        Currently pursuing my degree with focus on web development and artificial intelligence.
                      </p>
                    </div>
                    <div className="bg-white bg-opacity-80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:transform hover:scale-105">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mr-4">
                          <FontAwesomeIcon icon={faGraduationCap} className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-black">SMAN 1 Pasuruan</h3>
                          <p className="text-gray-600 font-medium">2018 - 2021</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2 font-semibold">Science Major</p>
                      <p className="text-gray-600 text-sm">
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
                  >
                    <Button variation="primary">
                      <Link href="/about" className="w-full h-full flex items-center justify-center">
                        Learn More
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="relative md:h-screen w-screen  gap-4 p-10 flex justify-center items-center flex-col overflow-hidden">
                <div className="z-0 mb-48 md:mb-0  md:absolute top-1/4  md:right-[10%] md:-translate-y-16 ">
                  <motion.div
                    className="bg-slate-300 rounded-sm h-[400px] md:h-[600px] w-[80vw] md:w-[30vw]" // Removed transition-all
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
                    <Image
                      src={Setup || "/placeholder.svg"}
                      layout="fill"
                      className="object-cover"
                      alt="Destio Setup"
                      placeholder="blur"
                    />
                  </motion.div>
                </div>
                <div className="z-10 w-full absolute md:w-auto  md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 overflow-hidden">
                  <motion.h1
                    className="bg-white lg:bg-transparent bg-opacity-50 px-3 md-px-0 text-black text-5xl md:text-8xl font-bold mb-3"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                    }}
                  >
                    Get In Touch
                  </motion.h1>
                  <Hr />
                  <motion.p
                    className="title text-xl mt-4 tracking-wider text-gray-500 leading-[1.7rem] md:mb-5"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                    }}
                  >
                    Feel free to contact me if you have any{" "}
                    <span className="bg-transparent md:bg-gray-100 bg-opacity-50 xl:bg-transparent">
                      questions or just want to say hi.
                    </span>
                  </motion.p>
                  <motion.p
                    className="title text-xl mt-4 tracking-wider text-gray-500 leading-[1.7rem] mb-5"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.3,
                      type: "spring",
                    }}
                  >
                    <a href="mailto:destiowahyu@gmail.com?subject=Hello&body=Hello Destio,">destiowahyu@gmail.com</a>
                  </motion.p>
                  {/* icons */}
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
                      href="https://www.linkedin.com/in/destiowahyu/"
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
