import projectsData from "@/json/projects-data.json"

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = projectsData.Projects.find((item) => item.slug === slug)

  if (!project) {
    return {
      title: "Project Not Found | Destio Wahyu Lanio",
    }
  }

  const description =
    project.desc?.find((text) => text?.trim()) ||
    `Portfolio project by Destio Wahyu Lanio: ${project.title}`

  return {
    title: `${project.title} | Destio Wahyu Lanio`,
    description,
    openGraph: {
      title: `${project.title} | Destio Wahyu Lanio`,
      description,
      images: project.thumbnail ? [{ url: project.thumbnail }] : undefined,
    },
  }
}

export default function ProjectSlugLayout({ children }) {
  return children
}
