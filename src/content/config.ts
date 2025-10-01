import { defineCollection, z } from "astro:content";
const areas = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    blurb: z.string().optional(),
  }),
});
export const collections = { areas };
