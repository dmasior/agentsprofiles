import { parseFragmentBody } from './parse-fragment';
import { sortTech } from './stack-filter';
import {
  SECTION_KEYS,
  type CommandKey,
  type FragmentBody,
  type FragmentLibrary,
  type TechGroupId,
} from './types';

export interface RawEntry<T> {
  id: string;
  data: T;
  body?: string;
}

export interface RawFocusArea {
  label: string;
  order: number;
  scope: string;
}

export interface RawContext {
  label: string;
  order: number;
  description: string;
  summary: string;
}

export interface RawTech {
  label: string;
  group: TechGroupId;
  aliases?: string[];
  commands?: Partial<Record<CommandKey, string>>;
}

export interface RawEntries {
  base: RawEntry<unknown>[];
  focusAreas: RawEntry<RawFocusArea>[];
  contexts: RawEntry<RawContext>[];
  tech: RawEntry<RawTech>[];
}

export function buildLibrary(raw: RawEntries): FragmentLibrary {
  if (raw.base.length !== 1) {
    throw new Error(`Expected exactly one base fragment, found ${raw.base.length}`);
  }
  const contextIds = new Set(raw.contexts.map((c) => c.id));
  const parse = (file: string, source: string | undefined) => {
    const body = parseFragmentBody(source ?? '', file);
    validateConditions(body, contextIds, file);
    return body;
  };

  return {
    base: parse('base.md', raw.base[0].body),
    focusAreas: raw.focusAreas
      .map((e) => ({
        id: e.id,
        label: e.data.label,
        order: e.data.order,
        scope: e.data.scope,
        body: parse(`focus-areas/${e.id}.md`, e.body),
      }))
      .sort((a, b) => a.order - b.order),
    contexts: raw.contexts
      .map((e) => ({
        id: e.id,
        label: e.data.label,
        order: e.data.order,
        description: e.data.description,
        summary: e.data.summary,
        body: parse(`contexts/${e.id}.md`, e.body),
      }))
      .sort((a, b) => a.order - b.order),
    tech: sortTech(
      raw.tech.map((e) => ({
        id: e.id,
        label: e.data.label,
        group: e.data.group,
        aliases: e.data.aliases ?? [],
        commands: e.data.commands ?? {},
        body: parse(`tech/${e.id}.md`, e.body),
      })),
    ),
  };
}

export function validateConditions(
  body: FragmentBody,
  contextIds: ReadonlySet<string>,
  file: string,
): void {
  for (const key of SECTION_KEYS) {
    for (const bullet of body[key]) {
      for (const id of [...bullet.not, ...bullet.only]) {
        if (!contextIds.has(id)) {
          throw new Error(`${file}: unknown context id "${id}" in bullet "${bullet.text}"`);
        }
      }
    }
  }
}

// The JSON is embedded in a <script> element. Escaping "<" stops fragment text from closing it.
export function serializeLibrary(library: FragmentLibrary): string {
  return JSON.stringify(library).replace(/</g, '\\u003c');
}
