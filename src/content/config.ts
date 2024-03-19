import { defineCollection } from "astro:content";
import { z } from "zod";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    date: z
      .string()
      .transform((str) => new Date(str.split("-").reverse().join("-"))),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    link: z.string().optional(),
    github: z.string().optional(),
    image: z.string(),
    date: z
      .string()
      .transform((str) => new Date(str.split("-").reverse().join("-"))),
  }),
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { posts, pages, projects };
