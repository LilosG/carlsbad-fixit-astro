import type { APIRoute } from "astro"
export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL("https://sandiegohandymanpro.co")).toString().replace(/\/$/, "")
  const body = `User-agent: *
Allow: /
Sitemap: ${base}/sitemap.xml
`
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
