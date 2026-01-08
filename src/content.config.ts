import { defineCollection, reference } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const tech = defineCollection({
  loader: file("./src/data/tech.json"),
  schema: z.object({ id: z.string(), name: z.string() }),
});

const projects = defineCollection({
  loader: glob({ pattern: "*.{md,mdx}", base: "./src/data/projects" }),
  schema: z.object({
    title: z.string(),
    url: z.string().url().optional(),
    repoURL: z.string().url().optional(),
    stack: z.array(reference("tech")),
    updatedDate: z.coerce.date(),
  }),
});

export const collections = { tech, projects };
