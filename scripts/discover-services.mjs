import fs from "fs"; import path from "path"

const roots = ["src", "dist"]
const files = []
function walk(d){ for(const f of fs.readdirSync(d)){ const p=path.join(d,f); const st=fs.statSync(p)
  if(st.isDirectory()) walk(p)
  else if(/\.(astro|md|mdx|html)$/.test(f)) files.push(p)
}}
roots.forEach(r => fs.existsSync(r) && walk(r))

const seen = new Set()
const items = []

for (const p of files) {
  const s = fs.readFileSync(p, "utf8")
  const reTag = /<a[^>]+href=["']\/services?\/([a-z0-9-]+)["'][^>]*>([\s\S]*?)<\/a>/gi
  let m
  while ((m = reTag.exec(s))) {
    const slug = m[1].toLowerCase()
    let name = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
    if (!name) name = slug.split("-").map(w => w[0]?.toUpperCase()+w.slice(1)).join(" ")
    if (slug && !seen.has(slug)) { seen.add(slug); items.push({ slug, name }) }
  }
  const reHref = /href=["']\/services?\/([a-z0-9-]+)["']/gi
  while ((m = reHref.exec(s))) {
    const slug = m[1].toLowerCase()
    if (!seen.has(slug)) {
      const name = slug.split("-").map(w => w[0]?.toUpperCase()+w.slice(1)).join(" ")
      seen.add(slug); items.push({ slug, name })
    }
  }
}

if (!items.length) {
  console.log("No services found in src or dist. Edit src/data/services.ts manually.")
  process.exit(0)
}

const out = `export type Service = { slug: string; name: string }
export const services: Service[] = ${JSON.stringify(items, null, 2)}
`
fs.mkdirSync("src/data", { recursive: true })
fs.writeFileSync("src/data/services.ts", out)
console.log(`services.ts updated with ${items.length} services`)
