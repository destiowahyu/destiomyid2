import "./globals.css"
import Navbar from "@/components/Navbar"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false
import "./nprogress.css"
import { Analytics } from "@vercel/analytics/react"
import ClientTopProgressBar from "@/components/ClientTopProgressBar"
import { ThemeProvider } from "@/components/ThemeProvider"
import { LanguageProvider } from "@/components/LanguageProvider"
import { Suspense } from "react"

export const metadata = {
  metadataBase: new URL("https://www.destio.my.id"),

  title: {
    default: "Destio Wahyu | Portfolio",
    template: "%s | Destio Wahyu",
  },

  description:
    "I'm Destio Wahyu, a web developer and experienced video editor who blends technology and creativity. Graduate of Universitas Dian Nuswantoro, passionate about music and artificial intelligence.",

  applicationName: "Destio Wahyu Lanio",

  keywords: [
    "Destio Wahyu",
    "Destio Portfolio",
    "Web Developer Udinus",
    "Video Editor",
    "Destio Lanio",
  ],

  icons: {
    icon: [
      { url: "/image/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/image/logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/image/logo.png",
  },

  openGraph: {
    type: "website",
    url: "https://www.destio.my.id",
    title: "Destio Wahyu | Portfolio",
    description:
      "Destio Wahyu Lanio — web developer, video editor, music enthusiast, and AI enthusiast.",
    siteName: "Destio Wahyu Lanio",
    images: [
      {
        url: "/og-image-rev.png",
        width: 1200,
        height: 630,
        alt: "Destio Wahyu Portfolio",
      },
    ],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/image/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/image/logo.png" />
    

      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <Suspense fallback={null}>
              <ClientTopProgressBar />
              <Navbar />
              {children}
              <Analytics />
            </Suspense>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
