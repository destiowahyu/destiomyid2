"use client"
import { useLanguage } from "./LanguageProvider"
import { motion } from "framer-motion"

const LanguageToggle = () => {
  const { language, changeLanguage } = useLanguage()

  const toggleLanguage = () => {
    changeLanguage(language === "en" ? "id" : "en")
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={language === "en" ? "Switch to Indonesian" : "Switch to English"}
    >
      <div className="relative w-6 h-4 overflow-hidden rounded-sm">
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
      </div>
    </motion.button>
  )
}

export default LanguageToggle
