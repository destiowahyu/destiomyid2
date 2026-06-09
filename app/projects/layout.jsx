import Footer from "@/components/Footer"

export const metadata = {
  title: "Projects | Destio Wahyu Lanio",
  description:
    "Selected projects by Destio Wahyu Lanio spanning web development, video editing, UI/UX design, and networking.",
}

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
