import fs from "fs"
const f = "src/layouts/Base.astro"
let s = fs.readFileSync(f, "utf8")
if (!s.includes('import JsonLd')) {
  s = s.replace('import SeoHead from "../components/SeoHead.astro"', 'import SeoHead from "../components/SeoHead.astro"\nimport JsonLd from "../components/JsonLd.astro"')
}
const orgBlock = `
  <JsonLd data={{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "San Diego HandyMan Pros",
    "url": Astro.site ? Astro.site.origin : "https://sandiegohandymanpro.co",
    "email": "hello@sandiegohandymanpros.co",
    "telephone": "619-123-4567"
  }} />
  <JsonLd data={{
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "San Diego HandyMan Pros",
    "address": {
      "@type":"PostalAddress",
      "streetAddress":"401 W A St Ste 200",
      "addressLocality":"San Diego",
      "addressRegion":"CA",
      "postalCode":"92101"
    },
    "telephone":"619-123-4567",
    "areaServed":"San Diego County"
  }} />`
if (!s.includes('LocalBusiness')) {
  s = s.replace('</Footer site={site} />', '</Footer site={site} />\n' + orgBlock)
}
fs.writeFileSync(f, s)
console.log("Patched Base.astro with site-wide JSON-LD")
