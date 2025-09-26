import type { APIRoute } from "astro"
import { cities } from "../data/cities"
import { services } from "../data/services"

export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL("https://sandiegohandymanpro.co")).toString().replace(/\/$/, "")
  const urls: string[] = [
    "/",
    "/services",
    "/service-areas",
    "/contact",
    ...services.map(s => `/service/${s.slug}`),
    ...cities.map(c => `/service-area/${c.slug}`),
    ...cities.flatMap(c => services.map(s => `/${c.slug}/${s.slug}`))
  ]
  const now = new Date().toISOString()
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(u => `<url><loc>${base}${u}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>${u === "/" ? "1.0" : "0.7"}</priority></url>`).join("")}
  </urlset>`
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } })
}
