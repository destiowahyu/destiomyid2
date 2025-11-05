"use client"
import { createContext, useContext, useState, useEffect } from "react"

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (newLanguage) => {
    localStorage.setItem("language", newLanguage)

    const coverDurationMs = 400
    const revealDelayMs = 50
    const revealDurationMs = 500
    const fadeOutMs = 280
    const fadeInMs = 320

    // util: get next localized text set on element via data attributes
    const getNextText = (el) => {
      try {
        const next = newLanguage === 'en' ? el.getAttribute('data-i18n-en') : el.getAttribute('data-i18n-id')
        return next || ''
      } catch { return '' }
    }

    // util: measure width of provided text with element styles
    const measureTextWidth = (el, text) => {
      try {
        const cs = window.getComputedStyle(el)
        const span = document.createElement('span')
        span.textContent = text
        span.style.position = 'absolute'
        span.style.visibility = 'hidden'
        span.style.whiteSpace = cs.whiteSpace || 'pre'
        span.style.letterSpacing = cs.letterSpacing
        span.style.font = cs.font
        span.style.fontFamily = cs.fontFamily
        span.style.fontSize = cs.fontSize
        span.style.fontWeight = cs.fontWeight
        span.style.textTransform = cs.textTransform
        span.style.paddingLeft = cs.paddingLeft
        span.style.paddingRight = cs.paddingRight
        span.style.boxSizing = 'border-box'
        el.parentElement?.appendChild(span)
        const w = span.offsetWidth
        span.remove()
        return w
      } catch {
        return el.offsetWidth
      }
    }

    // 1) Cover existing text fully
    let elements = []
    let fadeTargets = []
    try {
      elements = Array.from(document.querySelectorAll('[data-wipe-on-lang]'))
      fadeTargets = Array.from(document.querySelectorAll('[data-fade-on-lang]'))
      elements.forEach((el) => {
        el.classList.remove('wipe-run', 'wipe-reveal', 'wipe-cover')
        // force reflow
        void el.offsetWidth
        const currentWidth = el.offsetWidth
        const nextText = getNextText(el)
        const nextWidth = nextText ? measureTextWidth(el, nextText) : currentWidth
        const target = Math.max(currentWidth, nextWidth)
        el.style.setProperty('--wipe-target-px', `${target}px`)
        el.classList.add('wipe-cover')
      })
      // trigger fade out for smaller texts, keep them dim until fade-in starts
      fadeTargets.forEach((el) => {
        el.classList.remove('lang-fade-out', 'lang-fade-in', 'lang-dim')
        void el.offsetWidth
        el.classList.add('lang-fade-out')
        setTimeout(() => {
          el.classList.remove('lang-fade-out')
          el.classList.add('lang-dim') // keep dimmed to avoid flicker
        }, fadeOutMs)
      })
    } catch {}

    // 2) After cover completes, switch language
    setTimeout(() => {
      setLanguage(newLanguage)

      // 2b) Dispatch event for any listeners
      try {
        const evt = new CustomEvent("languageChanged", { detail: { language: newLanguage } })
        window.dispatchEvent(evt)
      } catch {}

      // 3) Small delay to allow DOM to update, then reveal new text
      setTimeout(() => {
        try {
          const revealTargets = elements.length ? elements : Array.from(document.querySelectorAll('[data-wipe-on-lang]'))
          revealTargets.forEach((el) => {
            el.classList.remove('wipe-cover', 'wipe-run', 'wipe-reveal')
            void el.offsetWidth
            // ensure var is still applied for reveal
            const currentWidth = el.offsetWidth
            const nextTextNow = getNextText(el)
            const nextWidthNow = nextTextNow ? measureTextWidth(el, nextTextNow) : currentWidth
            const targetNow = Math.max(currentWidth, nextWidthNow)
            el.style.setProperty('--wipe-target-px', `${targetNow}px`)
            el.classList.add('wipe-reveal')
            setTimeout(() => el.classList.remove('wipe-reveal'), revealDurationMs + 50)
          })
          // fade in small texts back from dim state
          const fadeInEls = fadeTargets.length ? fadeTargets : Array.from(document.querySelectorAll('[data-fade-on-lang]'))
          fadeInEls.forEach((el) => {
            el.classList.remove('lang-fade-out')
            // keep lang-dim until fade-in starts to ensure continuity
            void el.offsetWidth
            el.classList.add('lang-fade-in')
            // after fade-in completes, clear dim state
            setTimeout(() => {
              el.classList.remove('lang-fade-in', 'lang-dim')
            }, fadeInMs + 50)
          })
        } catch {}
      }, revealDelayMs)
    }, coverDurationMs)
  }

  const value = {
    language,
    changeLanguage,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

