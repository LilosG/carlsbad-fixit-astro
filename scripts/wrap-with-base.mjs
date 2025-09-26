import fs from "fs"
const f = process.argv[2]
if (!fs.existsSync(f)) process.exit(0)
let s = fs.readFileSync(f, "utf8")
if (s.includes("<Base")) process.exit(0)
const hasFront = s.startsWith("---")
if (hasFront) {
  const end = s.indexOf("\n---", 3)
  if (end !== -1) {
    const front = s.slice(0, end + 4)
    const body = s.slice(end + 4)
    const imp = 'import Base from "../layouts/Base.astro"\n'
    const frontNew = front.includes("import Base from") ? front : front.replace(/---\n/, `---\n${imp}`)
    s = frontNew + "\n<Base>\n" + body.trim() + "\n</Base>\n"
  } else {
    s = `---\nimport Base from "../layouts/Base.astro"\n---\n<Base>\n` + s.trim() + `\n</Base>\n`
  }
} else {
  s = `---\nimport Base from "../layouts/Base.astro"\n---\n<Base>\n` + s.trim() + `\n</Base>\n`
}
fs.writeFileSync(f, s)
