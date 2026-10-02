import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TECH_GROUP_IDS } from './builder/types';

const command = z.string().min(1).optional();

const base = defineCollection({
  loader: glob({ base: './src/content', pattern: 'base.md' }),
  schema: z.strictObject({}),
});

const focusAreas = defineCollection({
  loader: glob({ base: './src/content/focus-areas', pattern: '*.md' }),
  schema: z.strictObject({
    label: z.string().min(1),
    order: z.number().int(),
    scope: z.string().min(1),
  }),
});

const contexts = defineCollection({
  loader: glob({ base: './src/content/contexts', pattern: '*.md' }),
  schema: z.strictObject({
    label: z.string().min(1),
    order: z.number().int(),
    description: z.string().min(1),
    summary: z.string().min(1),
  }),
});

const tech = defineCollection({
  loader: glob({ base: './src/content/tech', pattern: '*.md' }),
  schema: z.strictObject({
    label: z.string().min(1),
    group: z.enum(TECH_GROUP_IDS),
    aliases: z.array(z.string().min(1)).optional(),
    commands: z
      .strictObject({
        install: command,
        build: command,
        test: command,
        lint: command,
        format: command,
        run: command,
      })
      .optional(),
  }),
});

export const collections = { base, focusAreas, contexts, tech };
