"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import jsonData from "@/json/projects-data.json"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import NotFound from "@/app/not-found"
import Image from "next/image"
import BlurImage from "@/public/image/placeholder/blur.jpg"
import FixedButon from "@/components/FixedButton"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"

function ScrollDownButton() {
  const [isAtBottom, setIsAtBottom] = useState(false)

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    if (scrollTop < document.documentElement.scrollHeight - document.documentElement.clientHeight) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      })
      setIsAtBottom(true)
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      setIsAtBottom(false)
    }
  }

  return (
    <div className="fixed bottom-5 left-0 right-0 flex justify-center items-center mb-10">
      <motion.div
        className="h-10 w-10 bg-neutral-900 rounded-full flex justify-center items-center cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleScroll}
      >
        <FontAwesomeIcon icon={isAtBottom ? faChevronUp : faChevronDown} className="text-white text-2xl" />
      </motion.div>
    </div>
  )
}

function ZoomSlider({ zoom, onZoomChange, onDecrement, onIncrement }) {
  const percentage = ((zoom - 50) / 150) * 100

  return (
    <div className="flex flex-col gap-4 mb-12">
      {/* Slider Track */}
      <div className="flex items-center justify-center gap-3 md:gap-4 px-4">
        {/* Decrement Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDecrement}
          disabled={zoom <= 50}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center flex-shrink-0"
        >
          <span className="text-white text-xs md:text-sm font-medium">−</span>
        </motion.button>

        {/* Slider Container */}
        <div className="flex-1 flex items-center gap-3 bg-white rounded-full px-4 py-3 shadow-sm border border-neutral-100">
          {/* Slider Input */}
          <input
            type="range"
            min="50"
            max="200"
            step="1"
            value={zoom}
            onChange={onZoomChange}
            className="flex-1 h-1.5 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-neutral-900"
            style={{
              background: `linear-gradient(to right, rgb(23, 23, 23) 0%, rgb(23, 23, 23) ${percentage}%, rgb(229, 229, 229) ${percentage}%, rgb(229, 229, 229) 100%)`,
            }}
          />
          {/* Zoom Percentage */}
          <span className="text-sm font-semibold text-neutral-900 min-w-fit tabular-nums">{zoom}%</span>
        </div>

        {/* Increment Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onIncrement}
          disabled={zoom >= 200}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center flex-shrink-0"
        >
          <span className="text-white text-xs md:text-sm font-medium">+</span>
        </motion.button>
      </div>

      {/* Zoom Level Labels */}
      <div className="flex justify-between px-6 md:px-8 text-xs text-neutral-500 font-medium">
        <span>50%</span>
        <span>200%</span>
      </div>
    </div>
  )
}

function Page({ params }) {
  const [data, setData] = useState(null)
  const [imageDimensions, setImageDimensions] = useState({})

  useEffect(() => {
    const selectedData = jsonData.Projects.find((item) => item.slug === params.slug)
    if (selectedData === undefined) {
      setData("404")
    } else {
      setData(selectedData)
    }
  }, [params.slug])

  const filterDescriptions = (descriptions) => {
    if (!descriptions || descriptions.length === 0) return []
    return descriptions.filter((desc) => desc && desc.trim().length > 0)
  }

  const handleImageLoadingComplete = (index, result) => {
    if (result) {
      const naturalWidth = result.naturalWidth || result.width
      const naturalHeight = result.naturalHeight || result.height
      const isPortrait = naturalHeight > naturalWidth
      setImageDimensions((prev) => ({
        ...prev,
        [index]: { isPortrait },
      }))
    }
  }

  if (data === "404") {
    return (
      <>
        <NotFound />
      </>
    )
  } else if (!data) {
    return (
      <div className="relative min-h-screen w-full gap-4 p-10 flex justify-center items-center flex-col mb-10">
        <div className="min-h-screen flex justify-center items-center w-full">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 w-full">
            <div className="flex justify-center items-start flex-col mb-5 space-y-10 w-full p-4">
              <div className="animate-pulse bg-neutral-400 h-20 w-full rounded shadow-lg"></div>
              <div className="animate-pulse bg-neutral-400 h-20 w-full rounded shadow-lg"></div>
              <div className="animate-pulse bg-neutral-400 h-20 w-full rounded shadow-lg"></div>
              <div className="animate-pulse bg-neutral-400 h-20 w-full rounded shadow-lg"></div>
              <div className="animate-pulse bg-neutral-400 h-20 w-full rounded shadow-lg"></div>
            </div>
            <div className="flex justify-start items-start flex-col mb-5 w-full p-4">
              <div className="animate-pulse duration-500 shadow-lg bg-neutral-400 rounded w-full h-full"></div>
            </div>
          </div>
        </div>
        {/* Loading images */}
        <div className="mx-auto grid grid-cols-1 p-5 md:p-20 w-full h-auto">
          <div className="w-full h-auto aspect-video">
            <div className="animate-pulse duration-500 shadow-lg bg-neutral-400 h-full w-full rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  const validDescriptions = filterDescriptions(data.desc)

  return (
    <div className="relative min-h-screen w-full gap-4 p-10 flex justify-center items-center flex-col mb-10">
      <FixedButon href="/projects">
        <FontAwesomeIcon icon={faChevronLeft} className="text-black pr-10" />
      </FixedButon>
      <ScrollDownButton />

      {/* Header Section */}
      <div className="min-h-screen flex justify-center items-center">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 mt-10 md:mt-0 gap-10">
          {/* Left Column - Project Info */}
          <div className="min-h-screen sm:min-h-0 flex justify-center items-start flex-col mb-5 space-y-10 mx-auto">
            {/* Title */}
            <div>
              <h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400">Project</h2>
              <h1 className="text-4xl font-medium text-neutral-900 text-balance">{data.title}</h1>
            </div>

            {/* Technology */}
            <div>
              <h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400">Technology</h2>
              <p className="text-2xl font-normal text-neutral-900">{data.tech.join(", ")}</p>
            </div>

            {/* Category */}
            {data.right && (
              <div>
                <h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400">Category</h2>
                <p className="text-2xl font-normal text-neutral-900">{data.right}</p>
              </div>
            )}

            {/* Year */}
            {data.left && (
              <div>
                <h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400">Year</h2>
                <p className="text-2xl font-normal text-neutral-900">{data.left}</p>
              </div>
            )}

            {/* Preview Link */}
            {data.preview && (
              <div>
                <h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400">Preview</h2>
                <p className="text-2xl font-normal text-neutral-900">
                  <a
                    href={data.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neutral-600 transition"
                  >
                    Preview <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-3" />
                  </a>
                </p>
              </div>
            )}

            {/* Source Code Link */}
            {data.code && (
              <div>
                <h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400">Source Code</h2>
                <p className="text-2xl font-normal text-neutral-900">
                  <a
                    href={data.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neutral-600 transition"
                  >
                    Github <FontAwesomeIcon icon={faGithub} className="ml-3" />
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Description */}
          <div className="flex justify-start items-start flex-col mb-5">
            {validDescriptions.length > 0 && (
              <>
                <h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400 mb-5">Description</h2>
                <div className="space-y-5">
                  {validDescriptions.map((desc, index) => (
                    <p key={index} className="text-xl text-justify tracking-wide font-normal text-gray-500">
                      {desc}
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full px-5">
        {/* Display images */}
        <div className="p-5 md:p-20 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.images.map((image, index) => {
              const isPortrait = imageDimensions[index]?.isPortrait ?? true
              const colSpanClass = isPortrait ? "md:col-span-1" : "md:col-span-2"

              return (
                <div key={index} className={colSpanClass}>
                  <div className="w-full h-auto text-center flex flex-col justify-center">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Project Image ${index + 1}`}
                      className="w-full h-auto"
                      width={1920}
                      height={1080}
                      blurDataURL={BlurImage.src}
                      onLoadingComplete={(result) => handleImageLoadingComplete(index, result)}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
