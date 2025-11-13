"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Image from "next/image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faArrowUpRightFromSquare, faPlay, faGlobe, faMobileAlt, faVideo } from "@fortawesome/free-solid-svg-icons"
import FixedButon from "@/components/FixedButton"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import Projects from "@/json/projects-data.json"
import Link from "next/link"

export default function Page() {
  const projects = Projects.Projects
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)

  // Mapping untuk kategori ID ke nama
  const categoryMap = {
    1: "Web Development",
    2: "Video Editing",
    3: "Mobile",
    9: "Other",
    // note: Featured (10) intentionally omitted / removed
  }

  // Filter hanya project yang memiliki left atau year (tahun) dan show = true
  // ATAU project yang memiliki video
  const filteredProjects = projects.filter(
    (project) =>
      ((project.left || project.year) && project.show !== false) || (project.video && project.show !== false),
  )

  const getCategoryName = (categoryArray) => {
    if (!categoryArray || categoryArray.length === 0) return "-"
    // Ambil kategori utama (yang pertama)
    return categoryMap[categoryArray[0]] || "-"
  }

  // Map category id to a primary color class used for the left accent
  const getCategoryColor = (catId) => {
    const id = Number(catId)
    switch (id) {
      case 1:
        return "bg-blue-500"
      case 2:
        return "bg-red-500"
      case 3:
        return "bg-green-500"
      case 9:
        return "bg-gray-500"
      default:
        return "bg-gray-400"
    }
  }

  const categoryStyleMap = {
    1: { border: "border-blue-200", text: "text-blue-600", icon: faGlobe },
    2: { border: "border-red-200", text: "text-red-600", icon: faVideo },
    3: { border: "border-green-200", text: "text-green-700", icon: faMobileAlt },
    9: { border: "border-gray-200", text: "text-gray-700", icon: faGlobe },
  }

  // Render badge that displays the project's `right` text but styles according to primary category
  const renderRightBadge = (project) => {
    const primary = project?.category && project.category.length ? Number(project.category[0]) : null
    const style = categoryStyleMap[primary] || { border: "border-gray-200", text: "text-gray-700", icon: faGlobe }
    // Use right field but remove 'Featured' if present
    let label = project?.right || "-"
    label = label
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s && s.toLowerCase() !== "featured")
      .join(", ")
    if (!label) label = "-"

    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-white/3 border ${style.border} ${style.text} mr-1`}
      >
        <FontAwesomeIcon icon={style.icon} className={`${style.text} mr-1 text-[11px]`} />
        <span className="truncate max-w-[10rem]">{label}</span>
      </span>
    )
  }

  // Render category as attractive badges (gradient, icon, subtle blur)
  const renderCategoryBadges = (categoryArray) => {
    // Minimal, modern badges: small, flat, subtle border, muted text
    if (!categoryArray || categoryArray.length === 0)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-transparent border border-gray-200 text-gray-700">
          -
        </span>
      )
    return categoryArray.map((cat) => {
      const id = Number(cat)
      switch (id) {
        case 1:
          return (
            <span
              key={id}
              className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-white/3 border border-blue-200 text-blue-600 mr-1"
            >
              <FontAwesomeIcon icon={faGlobe} className="text-blue-500 mr-1 text-[11px]" />
              <span>Web</span>
            </span>
          )
        case 2:
          return (
            <span
              key={id}
              className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-white/3 border border-red-200 text-red-600 mr-1"
            >
              <FontAwesomeIcon icon={faVideo} className="text-red-500 mr-1 text-[11px]" />
              <span>Video</span>
            </span>
          )
        case 3:
          return (
            <span
              key={id}
              className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-white/3 border border-green-200 text-green-700 mr-1"
            >
              <FontAwesomeIcon icon={faMobileAlt} className="text-green-600 mr-1 text-[11px]" />
              <span>Mobile</span>
            </span>
          )
        case 9:
          return (
            <span
              key={id}
              className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-white/3 border border-gray-200 text-gray-700 mr-1"
            >
              <span>Other</span>
            </span>
          )
        case 10:
          // intentionally hide Featured
          return null
        default:
          return (
            <span
              key={id}
              className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-white/3 border border-gray-200 text-gray-700 mr-1"
            >
              Cat {id}
            </span>
          )
      }
    })
  }

  const handlePlayVideo = (video) => {
    setSelectedVideo(video)
    setIsVideoModalOpen(true)
  }

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false)
    setSelectedVideo(null)
  }

  const isVideoProject = (project) => project.video && project.category.includes(2)
  return (
    <>
      <main className="overflow-hidden">
        <FixedButon href="/projects">
          <FontAwesomeIcon icon={faChevronLeft} className="text-black pr-10" />
        </FixedButon>
        <div className="min-h-screen w-screen mt-10 md:mt-0  p-10 flex justify-center items-center flex-col mb-10">
          <div className="flex justify-center items-center flex-col my-5 self-start ">
            <motion.div
              className="bg-gray-700 w-28 h-1 rounded-full mb-3 self-start"
              initial={{
                opacity: 0,
                x: -250,
              }}
              animate={{
                opacity: 1,
                x: 50,
              }}
              transition={{
                delay: 0.5,
                duration: 1,
                type: "spring",
              }}
            ></motion.div>
            <motion.div
              className="bg-gray-700 w-28 h-1 rounded-full"
              initial={{
                opacity: 0,
                x: 200,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.5,
                duration: 1,
                type: "spring",
              }}
            ></motion.div>
            <motion.h1
              className="text-3xl font-bold mt-3"
              initial={{
                opacity: 0,
                x: -200,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.7,
                duration: 1,
                type: "spring",
              }}
            >
              Archive
            </motion.h1>
          </div>

          <div className="mx-auto container md:px-10 grid grid-cols-1 mb-">
            {/* invisible table */}
            <table className="space-y-3 w-full">
              <thead>
                <tr className="hover:shadow-md transition-all ease duration-500 flex flex-row">
                  <th className="text-start flex-1 min-w-0">Title</th>
                  <th className="text-start flex-shrink-0">Category</th>
                  <th className="text-start flex-shrink-0 w-20">Link</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project, index) => (
                  <tr key={index} className="hover:shadow-md transition-all ease duration-500 relative flex flex-row">
                    <td className="pl-6 relative flex-1 min-w-0">
                      {/* left color accent for category */}
                      <div
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-r-md ${getCategoryColor(project.category?.[0])}`}
                      />
                      {isVideoProject(project) ? (
                        <div className="relative inline-flex items-center gap-2 w-full p-2 sm:p-3 rounded-lg bg-gradient-to-r from-neutral-900/10 to-neutral-900/5 hover:shadow-lg transform hover:-translate-y-1 transition">
                          {/* Play Icon Badge - Left Side Only */}
                          <motion.div
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            animate={isVideoProject(project) ? { scale: [1, 1.06, 1] } : {}}
                            transition={
                              isVideoProject(project) ? { duration: 1.6, repeat: Number.POSITIVE_INFINITY } : {}
                            }
                            className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600/20 border-2 border-red-600 flex items-center justify-center cursor-pointer"
                            onClick={() => handlePlayVideo(project.video)}
                          >
                            <FontAwesomeIcon icon={faPlay} className="text-red-600 text-xs ml-0.5" />
                          </motion.div>

                          {/* Title with gradient text */}
                          <span
                            onClick={() => handlePlayVideo(project.video)}
                            onMouseEnter={() => setHoveredProjectIndex(index)}
                            onMouseLeave={() => setHoveredProjectIndex(null)}
                            className="font-semibold bg-gradient-to-r from-red-500 via-red-600 to-orange-500 bg-clip-text text-transparent hover:from-red-400 hover:via-red-500 hover:to-orange-400 transition-all duration-300 hover:underline underline-offset-2 cursor-pointer flex-1 min-w-0"
                          >
                            {project.title}
                          </span>

                          {/* Hover Preview Modal */}
                          <AnimatePresence>
                            {hoveredProjectIndex === index && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.85, y: 5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.85, y: 5 }}
                                transition={{
                                  type: "tween",
                                  ease: "easeOut",
                                  duration: 0.35,
                                }}
                                className={
                                  index < 3
                                    ? "absolute left-0 top-full z-50 dark:bg-black bg-white rounded-lg overflow-hidden shadow-2xl dark:border-red-600/30 border-red-300/50 border mt-2"
                                    : "absolute left-0 bottom-full z-50 dark:bg-black bg-white rounded-lg overflow-hidden shadow-2xl dark:border-red-600/30 border-red-300/50 border mb-2"
                                }
                                style={{
                                  width: "clamp(200px, 80vw, 280px)",
                                }}
                                onMouseEnter={() => setHoveredProjectIndex(index)}
                                onMouseLeave={() => setHoveredProjectIndex(null)}
                              >
                                {/* Thumbnail */}
                                <div className="relative w-full aspect-video dark:bg-gradient-to-br dark:from-red-950 dark:via-gray-900 dark:to-black bg-gradient-to-br from-red-100 via-gray-100 to-gray-200 overflow-hidden">
                                  {/* Border glow */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />

                                  {/* Image */}
                                  <Image
                                    src={project.thumbnail || "/placeholder.svg"}
                                    alt={project.title}
                                    width={480}
                                    height={270}
                                    className="w-full h-full object-cover"
                                  />

                                  {/* Play Button Overlay */}
                                  <motion.button
                                    onClick={() => handlePlayVideo(project.video)}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/10 transition-colors"
                                  >
                                    <motion.div
                                      animate={{
                                        boxShadow: [
                                          "0 0 0 0px rgba(239, 68, 68, 0.8)",
                                          "0 0 0 20px rgba(239, 68, 68, 0)",
                                        ],
                                      }}
                                      transition={{
                                        duration: 1.5,
                                        repeat: Number.POSITIVE_INFINITY,
                                      }}
                                      className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg"
                                    >
                                      <FontAwesomeIcon icon={faPlay} className="text-white text-lg ml-1" />
                                    </motion.div>
                                  </motion.button>
                                </div>

                                {/* Info Section */}
                                <div className="p-2 dark:bg-gradient-to-r dark:from-gray-950 dark:to-red-950/30 dark:border-t dark:border-red-600/20 bg-gradient-to-r from-gray-50 to-red-50/50 border-t border-red-200">
                                  <p className="dark:text-white text-gray-900 text-xs font-bold line-clamp-1">
                                    {project.title}
                                  </p>
                                  <div className="mt-0.5">{renderRightBadge(project)}</div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <div className="w-full p-2 sm:p-3 rounded-lg bg-neutral-900/5">
                          <Link href={`/projects/${project.slug}`}>
                            <span className="font-semibold">{project.title}</span>{" "}
                            {(project.left || project.year) && (
                              <span className="text-sm text-gray-400"> ({project.left || project.year})</span>
                            )}
                          </Link>
                        </div>
                      )}
                    </td>
                    <td className="py-2 flex-shrink-0">{renderRightBadge(project)}</td>
                    <td className="flex-shrink-0 w-20">
                      <div className="flex flex-row justify-center items-center gap-2">
                        {isVideoProject(project) ? (
                          <button
                            onClick={() => handlePlayVideo(project.video)}
                            title="Play video"
                            className="text-red-600 hover:text-red-700 transition-colors flex-shrink-0"
                          >
                            <FontAwesomeIcon icon={faPlay} className="text-lg" />
                          </button>
                        ) : (
                          <>
                            {project.code && (
                              <a href={project.code} title="Link to GitHub" className="flex-shrink-0">
                                <FontAwesomeIcon icon={faGithub} className="text-xl" />
                              </a>
                            )}
                            {project.preview && (
                              <a href={project.preview} title="Link to project preview" className="flex-shrink-0">
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xl" />
                              </a>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={handleCloseVideoModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-2xl"
            >
              <iframe
                src={selectedVideo}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
