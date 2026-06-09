import projectsData from "@/json/projects-data.json"

const BASE_URL = "https://www.destio.my.id"

export default function sitemap() {
  const lastModified = new Date()

  const staticPages = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projects/archive`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  const projectPages = projectsData.Projects.filter(
    (project) => project.show && project.slug
  ).map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  return [...staticPages, ...projectPages]
}
