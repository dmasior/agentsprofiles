import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parse as parseYaml } from 'yaml';
import { buildLibrary, type RawEntries } from '../src/builder/build-library';
import { compose } from '../src/builder/compose';
import { parseFragmentBody } from '../src/builder/parse-fragment';
import {
  SECTION_KEYS,
  TECH_GROUP_IDS,
  type FragmentBody,
  type TechGroupId,
} from '../src/builder/types';

const SRC = fileURLToPath(new URL('../src', import.meta.url));
const CONTENT = join(SRC, 'content');

const FOCUS_AREA_IDS = [
  'backend',
  'data',
  'designer',
  'devops',
  'frontend',
  'ml',
  'mobile',
  'qa',
  'security',
  'writer',
];
const CONTEXT_IDS = [
  'greenfield-long-term',
  'greenfield-mvp',
  'internal-tools',
  'legacy-maintenance',
  'legacy-modernization',
  'monorepo',
  'oss-library',
  'oss-project',
  'regulated',
];

const EXPECTED_TECH: Record<TechGroupId, string[]> = {
  languages: [
    'bash',
    'c',
    'cpp',
    'csharp',
    'dart',
    'elixir',
    'go',
    'java',
    'javascript',
    'kotlin',
    'php',
    'python',
    'ruby',
    'rust',
    'scala',
    'swift',
    'typescript',
  ],
  frontend: [
    'angular',
    'astro',
    'htmx',
    'nextjs',
    'nuxt',
    'react',
    'react-router',
    'solid',
    'storybook',
    'svelte',
    'sveltekit',
    'tailwind',
    'vite',
    'vue',
  ],
  backend: [
    'aspnet-core',
    'bun',
    'deno',
    'django',
    'express',
    'fastapi',
    'fastify',
    'flask',
    'gin',
    'graphql',
    'grpc',
    'laravel',
    'nestjs',
    'nodejs',
    'openapi',
    'phoenix',
    'rails',
    'spring-boot',
    'symfony',
  ],
  mobile: ['android', 'expo', 'flutter', 'ios', 'kmp', 'react-native'],
  databases: [
    'cassandra',
    'clickhouse',
    'drizzle',
    'dynamodb',
    'elasticsearch',
    'mongodb',
    'mysql',
    'postgresql',
    'prisma',
    'redis',
    'sqlalchemy',
    'sqlite',
  ],
  infra: [
    'ansible',
    'aws',
    'azure',
    'cloudflare',
    'docker',
    'firebase',
    'gcp',
    'github-actions',
    'gitlab-ci',
    'helm',
    'kafka',
    'kubernetes',
    'nginx',
    'opentelemetry',
    'prometheus-grafana',
    'pulumi',
    'rabbitmq',
    'supabase',
    'terraform',
    'vercel',
  ],
  testing: ['cypress', 'jest', 'junit', 'k6', 'playwright', 'pytest', 'testing-library', 'vitest'],
  'data-ml': [
    'airflow',
    'dbt',
    'huggingface',
    'jupyter',
    'llm-apis',
    'mlflow',
    'pandas',
    'polars',
    'pytorch',
    'scikit-learn',
    'spark',
  ],
  design: ['design-tokens', 'figma'],
};

interface ContentFile {
  name: string;
  id: string;
  source: string;
  data: Record<string, unknown>;
  body: string;
}

function readContent(path: string, name: string): ContentFile {
  const source = readFileSync(path, 'utf8');
  const match = /^---\r?\n([\s\S]*?)\r?\n?---\r?\n?([\s\S]*)$/.exec(source);
  if (!match) throw new Error(`${name}: missing frontmatter`);
  return {
    name,
    id: name.replace(/^.*\//, '').replace(/\.md$/, ''),
    source,
    data: (parseYaml(match[1]) as Record<string, unknown> | null) ?? {},
    body: match[2],
  };
}

function readFolder(folder: string): ContentFile[] {
  return readdirSync(join(CONTENT, folder))
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => readContent(join(CONTENT, folder, f), `${folder}/${f}`));
}

const base = readContent(join(CONTENT, 'base.md'), 'base.md');
const focusAreas = readFolder('focus-areas');
const contexts = readFolder('contexts');
const tech = readFolder('tech');
const all = [base, ...focusAreas, ...contexts, ...tech];

const parsed = (f: ContentFile): FragmentBody => parseFragmentBody(f.body, f.name);
const boundaryCount = (body: FragmentBody) =>
  body.always.length + body['ask-first'].length + body.never.length;
const cases = (files: ContentFile[]) => files.map((f) => [f.name, f] as const);

describe('content files', () => {
  it('has the expected focus areas and contexts', () => {
    expect(focusAreas.map((f) => f.id)).toEqual(FOCUS_AREA_IDS);
    expect(contexts.map((f) => f.id)).toEqual(CONTEXT_IDS);
  });

  it.each(TECH_GROUP_IDS.map((g) => [g]))('has the expected technologies in group %s', (group) => {
    const actual = tech
      .filter((f) => f.data.group === group)
      .map((f) => f.id)
      .sort();
    expect(actual).toEqual([...EXPECTED_TECH[group]].sort());
  });

  it('has technologies in every group and 109 in total', () => {
    for (const group of TECH_GROUP_IDS) expect(EXPECTED_TECH[group].length).toBeGreaterThan(0);
    expect(tech.length).toBe(109);
  });

  it('has no tech file with an unknown group', () => {
    const unknown = tech.filter((f) => !TECH_GROUP_IDS.includes(f.data.group as TechGroupId));
    expect(unknown.map((f) => f.name)).toEqual([]);
  });

  it.each(cases(all))('%s has no en dash, em dash or emoji', (_, f) => {
    expect(f.source).not.toMatch(/[\u2013\u2014]/);
    expect(f.source).not.toMatch(/\p{Extended_Pictographic}/u);
  });

  it.each(cases(all))('%s has no duplicate bullets', (_, f) => {
    const texts = SECTION_KEYS.flatMap((key) => parsed(f)[key].map((b) => b.text));
    expect(texts.length).toBe(new Set(texts).size);
  });

  it.each(cases(focusAreas))('%s defines when its instructions apply', (_, f) => {
    expect(f.data.scope).toMatch(/^When .+:$/);
  });

  it.each(cases([...focusAreas, ...tech]))(
    '%s keeps the focus area and tech bullet budget',
    (_, f) => {
      const body = parsed(f);
      expect(body.rules.length).toBeGreaterThanOrEqual(3);
      expect(body.rules.length).toBeLessThanOrEqual(6);
      expect(boundaryCount(body)).toBeLessThanOrEqual(3);
    },
  );

  it.each(cases(contexts))('%s keeps the context bullet budget', (_, f) => {
    const body = parsed(f);
    expect(body.rules.length).toBeGreaterThanOrEqual(2);
    expect(body.rules.length).toBeLessThanOrEqual(6);
    expect(boundaryCount(body)).toBeLessThanOrEqual(6);
  });

  it('keeps the base bullet budget', () => {
    const body = parsed(base);
    expect(body.rules.length).toBeLessThanOrEqual(8);
    expect(boundaryCount(body)).toBeLessThanOrEqual(6);
  });
});

describe('library from content', () => {
  const raw = {
    base: [{ id: 'base', data: base.data, body: base.body }],
    focusAreas: focusAreas.map((f) => ({ id: f.id, data: f.data, body: f.body })),
    contexts: contexts.map((f) => ({ id: f.id, data: f.data, body: f.body })),
    tech: tech.map((f) => ({ id: f.id, data: f.data, body: f.body })),
  } as unknown as RawEntries;

  it('builds without errors', () => {
    expect(() => buildLibrary(raw)).not.toThrow();
  });

  it('keeps a typical selection short', () => {
    const library = buildLibrary(raw);
    const md = compose(
      { focusAreas: ['backend', 'qa'], context: 'greenfield-mvp', stack: ['go', 'postgresql'] },
      library,
      '2026-10-01',
    );
    expect(md).not.toContain('<select');
    expect(md.split('\n').length).toBeLessThan(150);
  });

  it('does not forbid the think time that k6 load tests need', () => {
    const md = compose(
      { focusAreas: ['qa'], context: 'greenfield-mvp', stack: ['k6'] },
      buildLibrary(raw),
      '2026-10-01',
    );
    expect(md).toContain('think time');
    expect(md).not.toContain('- Do not use fixed sleeps in tests.');
  });

  it('gives legacy-maintenance no rules that need a newer framework style', () => {
    const md = compose(
      {
        focusAreas: ['frontend'],
        context: 'legacy-maintenance',
        stack: ['nextjs', 'angular', 'svelte', 'vue', 'ios'],
      },
      buildLibrary(raw),
      '2026-10-01',
    );
    for (const modern of [
      'Server Component',
      'signals',
      '`@if`',
      'OnPush',
      '`$derived`',
      'createEventDispatcher',
      'defineProps',
      '@Observable',
    ]) {
      expect(md).not.toContain(modern);
    }
  });

  it('does not add repo-wide Python lint or format commands', () => {
    const md = compose(
      { focusAreas: ['backend'], context: 'legacy-maintenance', stack: ['python'] },
      buildLibrary(raw),
      '2026-10-01',
    );
    expect(md).not.toContain('ruff');
  });
});

describe('UI source files', () => {
  const files = readdirSync(SRC, { recursive: true, encoding: 'utf8' }).filter((f) =>
    /\.(astro|ts|css)$/.test(f),
  );

  it.each(files.map((f) => [f]))('%s has no en dash or em dash', (f) => {
    expect(readFileSync(join(SRC, f), 'utf8')).not.toMatch(/[\u2013\u2014]/);
  });
});
