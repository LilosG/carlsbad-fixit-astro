import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',              // tell Astro to build to /dist
  trailingSlash: 'ignore',       // fine for Vercel
  server: { port: 4321 },        // local only
});
