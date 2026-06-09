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

const SITE_URL = "https://www.destio.my.id"
const SITE_NAME = "Destio Wahyu Lanio"

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: "Destio Wahyu Lanio | Portfolio",

  description:
    "Destio Wahyu Lanio — web developer, video editor, network enthusiast, and AI enthusiast. Informatics Engineering graduate from Universitas Dian Nuswantoro.",

  applicationName: SITE_NAME,

  keywords: [
    "Destio Wahyu Lanio",
    "Destio Wahyu",
    "Destio Portfolio",
    "Web Developer Udinus",
    "Video Editor",
    "Destio Lanio",
  ],

  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Destio Wahyu Lanio | Portfolio",
    description:
      "Destio Wahyu Lanio — web developer, video editor, network enthusiast, and AI enthusiast.",
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-image-rev.png",
        width: 1200,
        height: 630,
        alt: "Destio Wahyu Lanio Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Destio Wahyu Lanio | Portfolio",
    description:
      "Destio Wahyu Lanio — web developer, video editor, network enthusiast, and AI enthusiast.",
    images: ["/og-image-rev.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description:
        "Portfolio website of Destio Wahyu Lanio, web developer and video editor.",
    },
    {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
      jobTitle: "Web Developer & Video Editor",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Universitas Dian Nuswantoro",
      },
      sameAs: [
        "https://github.com/destiowahyu",
        "https://www.linkedin.com/in/destiowahyu",
        "https://www.instagram.com/destiowahyu/",
      ],
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
