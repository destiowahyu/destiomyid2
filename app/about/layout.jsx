import Footer from "@/components/Footer"

export const metadata = {
  title: "About | Destio Wahyu Lanio",
  description:
    "Destio Wahyu Lanio — web developer, video editor, and network enthusiast. Informatics Engineering graduate from Universitas Dian Nuswantoro (UDINUS).",
}

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
