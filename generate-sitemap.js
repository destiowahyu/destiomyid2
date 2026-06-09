const { SitemapStream, streamToPromise } = require("sitemap")
const fs = require("fs")
const projectsData = require("./json/projects-data.json")

const BASE_URL = "https://www.destio.my.id"

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: BASE_URL })
  const lastmod = new Date().toISOString()

  sitemap.write({ url: "/", changefreq: "daily", priority: 1.0, lastmod })
  sitemap.write({ url: "/about", changefreq: "weekly", priority: 0.9, lastmod })
  sitemap.write({ url: "/projects", changefreq: "weekly", priority: 0.9, lastmod })
  sitemap.write({ url: "/projects/archive", changefreq: "monthly", priority: 0.7, lastmod })

  projectsData.Projects.filter((project) => project.show && project.slug).forEach((project) => {
    sitemap.write({
      url: `/projects/${project.slug}`,
      changefreq: "weekly",
      priority: 0.8,
      lastmod,
    })
  })

  sitemap.end()

  const sitemapXML = (await streamToPromise(sitemap)).toString()
  fs.writeFileSync("./public/sitemap.xml", sitemapXML)
}

generateSitemap()
