import fs from "fs"
const p = "src/pages/index.astro"
if (!fs.existsSync(p)) process.exit(0)
const s = fs.readFileSync(p, "utf8")
const re = /href=["']\/service(?:s)?\/([A-Za-z0-9-]+)["'][^>]*>(.*?)<\/a>/gis
const items = []
let m
const seen = new Set()
while ((m = re.exec(s)) !== null) {
  const slug = m[1].toLowerCase()
  const name = m[2].replace(/<[^>]+>/g, "").trim()
  if (!slug || !name || seen.has(slug)) continue
  seen.add(slug)
  items.push({ slug, name })
}
if (items.length > 0) {
  const out = `export type Service = { slug: string; name: string }\nexport const services: Service[] = ${JSON.stringify(items, null, 2)}\n`
  fs.writeFileSync("src/data/services.ts", out)
  process.stdout.write(`services.ts written with ${items.length} items\n`)
} else {
  process.stdout.write("no services detected; keeping existing src/data/services.ts\n")
}
