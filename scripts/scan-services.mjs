import fs from "fs"; import path from "path"
const root = "src"
const re = /href=["']\/service(?:s)?\/([A-Za-z0-9-]+)["'][^>]*>(.*?)<\/a>/gis
const items = []; const seen = new Set()
function walk(d){ for(const f of fs.readdirSync(d)){ const p=path.join(d,f); const st=fs.statSync(p)
  if(st.isDirectory()) walk(p)
  else if(/\.(astro|md|mdx|html)$/.test(f)){ const s=fs.readFileSync(p,"utf8"); let m
    while((m=re.exec(s))){ const slug=m[1].toLowerCase(); const name=m[2].replace(/<[^>]+>/g,"").trim()
      if(slug && name && !seen.has(slug)){ seen.add(slug); items.push({slug,name}) }
    }
  }
}}
walk(root)
if(items.length){ fs.writeFileSync("src/data/services.ts", `export type Service = { slug: string; name: string }\nexport const services: Service[] = ${JSON.stringify(items,null,2)}\n`)
  console.log(`services.ts updated with ${items.length} services`) }
else { console.log("No services found. Edit src/data/services.ts manually.") }
