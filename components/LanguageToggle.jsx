"use client"
import { useLanguage } from "./LanguageProvider"
import { motion } from "framer-motion"
import { useState } from "react"

const LanguageToggle = () => {
  const { language, changeLanguage } = useLanguage()
  const [burstKey, setBurstKey] = useState(0)

  const toggleLanguage = () => {
    setBurstKey((k) => k + 1)
    changeLanguage(language === "en" ? "id" : "en")
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      title={language === "en" ? "Switch to Indonesian" : "Switch to English"}
    >
      <motion.div
        key={`flag-${language}`}
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="relative w-6 h-4 overflow-hidden rounded-sm [transform-style:preserve-3d]"
      >
        {language === "en" ? (
          // American Flag - try multiple sources
          <img
            src="https://flagcdn.com/20x15/us.png"
            alt="US Flag"
            className="w-full h-full object-cover rounded-sm"
            onError={(e) => {
              // Try alternative source
              e.target.src = "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/us.svg"
              e.target.onError = () => {
                // Final fallback to emoji
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'block'
              }
            }}
          />
        ) : (
          // Indonesian Flag - try multiple sources
          <img
            src="https://flagcdn.com/20x15/id.png"
            alt="Indonesian Flag"
            className="w-full h-full object-cover rounded-sm"
            onError={(e) => {
              // Try alternative source
              e.target.src = "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/id.svg"
              e.target.onError = () => {
                // Final fallback to emoji
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'block'
              }
            }}
          />
        )}
        
        {/* Emoji fallback (hidden by default) */}
        <div className="text-lg flex items-center justify-center w-full h-full" style={{ display: 'none' }}>
          {language === "en" ? "🇺🇸" : "🇮🇩"}
        </div>
      </motion.div>

      {/* Ripple ring on click */}
      <motion.span
        key={`ring-${burstKey}`}
        className="pointer-events-none absolute rounded-full"
        initial={{ opacity: 0.35, scale: 0 }}
        animate={{ opacity: 0, scale: 2.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ width: 36, height: 36, border: "2px solid rgba(156,163,175,0.6)" }}
      />

      {/* Confetti burst */}
      <motion.div key={`burst-${burstKey}`} className="pointer-events-none absolute inset-0">
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const dist = 14
          const x = Math.cos(angle) * dist
          const y = Math.sin(angle) * dist
          return (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2"
              initial={{ x: 0, y: 0, scale: 0.6, opacity: 0.9, rotate: 0 }}
              animate={{ x, y, scale: 1, opacity: 0, rotate: 180 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span
                className="block"
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  background: i % 2 === 0 ? "#9ca3af" : "#e5e7eb",
                  boxShadow: "0 0 4px rgba(156,163,175,0.7)",
                }}
              />
            </motion.span>
          )
        })}
      </motion.div>
    </motion.button>
  )
}

export default LanguageToggle
