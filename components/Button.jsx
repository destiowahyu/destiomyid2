"use client"
import { useState } from "react"
import { motion } from "framer-motion"

const Button = ({ children, variation, className = "", ...props }) => {
  const [rippleKey, setRippleKey] = useState(0)
  const [rippleStyle, setRippleStyle] = useState({ left: 0, top: 0 })

  const handleClick = (e) => {
    try {
      const rect = e.currentTarget.getBoundingClientRect()
      setRippleStyle({ left: e.clientX - rect.left - 10, top: e.clientY - rect.top - 10 })
      setRippleKey((k) => k + 1)
    } catch {}
    props.onClick && props.onClick(e)
  }

  const base =
    variation === "primary"
      ? "bg-gray-700 border-2 border-transparent text-white hover:bg-gray-700 hover:text-white hover:border-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:hover:border-gray-900"
      : "transparent border-2 border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white"

  return (
    <motion.button
    {...props}
      onClick={handleClick}
      className={`title mr-3 rounded-2xl px-8 py-2 shadow-md transition duration-300 ease-in-out relative overflow-hidden ${base} ${className}`}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ y: 0, scale: 0.97 }}
    >
      {/* Shine sweep */}
      <motion.span
        className="pointer-events-none absolute inset-y-0 -left-16 w-10 rotate-12"
        initial={false}
        animate={{ x: [0, 200] }}
        transition={{ repeat: Infinity, repeatDelay: 2.2, duration: 1.2, ease: "easeOut" }}
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>

      {/* Ripple on click */}
      <motion.span
        key={`r-${rippleKey}`}
        className="pointer-events-none absolute z-0 rounded-full"
        style={{ width: 20, height: 20, left: rippleStyle.left, top: rippleStyle.top, background: "rgba(255,255,255,0.35)" }}
        initial={{ opacity: 0.6, scale: 0 }}
        animate={{ opacity: 0, scale: 12 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </motion.button>
  )
}

export default Button
