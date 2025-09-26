How to add a City or Service (Single Sources of Truth)

Add a Service
1) Edit src/data/services.ts and add an entry like:
   { slug: "ceiling-fan-installation", name: "Ceiling Fan Installation" }
2) Run:
   npx astro check && npm run build
3) Push to main. New pages will be created:
   /service/ceiling-fan-installation and /<city>/ceiling-fan-installation for all cities.

Add a City
1) Edit src/data/cities.ts and add:
   { slug: "vista", name: "Vista" }
2) Build and deploy as above. New pages:
   /service-area/vista and /vista/<service> for all services.

Notes
- Keep slugs lowercase, kebab-case, ASCII.
- Titles, meta, canonical, and JSON-LD are auto-configured via Base, SeoHead, and JsonLd.
- Internal links update automatically on /services, /service-areas, and service-area pages.

Validate
- Check /sitemap.xml for every route.
- Check /robots.txt for the sitemap path.
- View page source and search for the string: type="application/ld+json"
