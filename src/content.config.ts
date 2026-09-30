import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		/** Drives the "high score" column on the blog index. */
		score: z.number().int().min(0).max(999).default(100),
	}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		/** GitHub repo name, used to pull live stars/language at build time. */
		repo: z.string(),
		demo: z.string().url().optional(),
		status: z.enum(['active', 'stable', 'archived']).default('active'),
		featured: z.boolean().default(false),
		order: z.number().default(99),
		stack: z.array(z.string()).default([]),
		year: z.number(),
		sprite: z.enum(['coin', 'crab', 'ghost', 'star', 'heart', 'bolt', 'chip']).default('chip'),
		accent: z.enum(['phos', 'amber', 'hot', 'cyan', 'violet']).default('phos'),
		license: z.string().optional(),
	}),
});

export const collections = { blog, projects };
