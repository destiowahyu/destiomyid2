import "./globals.css"
import Navbar from "@/components/Navbar"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false
import "./nprogress.css"
import { Analytics } from "@vercel/analytics/react"
import ClientTopProgressBar from "@/components/ClientTopProgressBar"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Suspense } from "react"

export const metadata = {
  title: "Destio Wahyu | Portfolio",

  description:
    "I'm Destio Wahyu, a web developer and experienced video editor who loves blending technology and creativity. I graduated from Universitas Dian Nuswantoro in Software Engineering, and I'm also passionate about music and artificial intelligence.",

  author: "Destio Wahyu",
  siteUrl: "https://www.destio.my.id",
  applicationName: "Destio Wahyu Lanio",

  keywords: [
    "destio",
    "destio wahyu",
    "wahyu",
    "destio wahyu",
    "destio wahyu lanio",
    "tio destio",
    "tio lanio",
    "destio porto",
    "destio udinus",
  ],

  icons: {
    icon: [
      {
        url: "/image/logo.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/image/logo.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/image/logo.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    type: "website",
    url: "https://www.destio.my.id",
    title: "Destio Wahyu | Portfolio",
    site_name: "Destio Wahyu Lanio",
    description: "Destio Wahyu Lanio is a web developer, skilled video editor, music enthusiast, and AI enthusiast.",
    width: 1200,
    height: 630,
    images: [
      {
        url: "/og-image-rev.png",
        alt: "Destio Portfolio",
      },
    ],
    site_name: "Destio Wahyu Lanio",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/image/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/image/logo.png" />
    

      </head>
      <body>
        <ThemeProvider>
          <Suspense fallback={null}>
            <ClientTopProgressBar />
            <Navbar />
            {children}
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
