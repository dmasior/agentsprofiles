import { describe, expect, it } from 'vitest';
import { buildLibrary, serializeLibrary, type RawEntries } from '../src/builder/build-library';
import { library } from './fixtures';

function raw(overrides: Partial<RawEntries> = {}): RawEntries {
  return {
    base: [{ id: 'base', data: {}, body: '## rules\n- Base rule.\n' }],
    focusAreas: [
      {
        id: 'qa',
        data: { label: 'Testing', order: 2, scope: 'When testing:' },
        body: '## rules\n- Test.\n',
      },
      {
        id: 'backend',
        data: { label: 'Backend', order: 1, scope: 'When changing APIs:' },
        body: '## rules\n- Validate. <!-- not: mvp -->\n',
      },
    ],
    contexts: [
      { id: 'mvp', data: { label: 'MVP', order: 2, description: 'd', summary: 's' }, body: '' },
      { id: 'legacy', data: { label: 'Legacy', order: 1, description: 'd', summary: 's' } },
    ],
    tech: [
      {
        id: 'pytest',
        data: { label: 'pytest', group: 'testing' },
        body: '## rules\n- Fixtures.\n',
      },
      {
        id: 'go',
        data: {
          label: 'Go',
          group: 'languages',
          aliases: ['golang'],
          commands: { test: 'go test ./...' },
        },
        body: '## rules\n- Errors.\n',
      },
    ],
    ...overrides,
  };
}

describe('buildLibrary', () => {
  it('parses bodies and sorts into canonical order', () => {
    const lib = buildLibrary(raw());
    expect(lib.base.rules.map((b) => b.text)).toEqual(['Base rule.']);
    expect(lib.focusAreas.map((area) => area.id)).toEqual(['backend', 'qa']);
    expect(lib.focusAreas[0].scope).toBe('When changing APIs:');
    expect(lib.focusAreas[0].body.rules[0]).toEqual({ text: 'Validate.', not: ['mvp'], only: [] });
    expect(lib.contexts.map((c) => c.id)).toEqual(['legacy', 'mvp']);
    expect(lib.tech.map((t) => t.id)).toEqual(['go', 'pytest']);
  });

  it('fills defaults for missing aliases, commands and body', () => {
    const lib = buildLibrary(raw());
    const pytest = lib.tech.find((t) => t.id === 'pytest');
    expect(pytest?.aliases).toEqual([]);
    expect(pytest?.commands).toEqual({});
    expect(lib.contexts[0].body.rules).toEqual([]);
  });

  it('throws on a condition that names an unknown context', () => {
    const focusAreas = [
      {
        id: 'backend',
        data: { label: 'B', order: 1, scope: 'When changing APIs:' },
        body: '## rules\n- X. <!-- only: nope -->',
      },
    ];
    expect(() => buildLibrary(raw({ focusAreas }))).toThrow(
      'focus-areas/backend.md: unknown context id "nope"',
    );
  });

  it('reports the file path in parse errors', () => {
    const tech = [
      { id: 'go', data: { label: 'Go', group: 'languages' as const }, body: '## tips\n- X.' },
    ];
    expect(() => buildLibrary(raw({ tech }))).toThrow('tech/go.md:1: unknown section "tips"');
  });

  it('throws when there is not exactly one base fragment', () => {
    expect(() => buildLibrary(raw({ base: [] }))).toThrow(
      'Expected exactly one base fragment, found 0',
    );
  });
});

describe('serializeLibrary', () => {
  it('escapes < so the JSON cannot close the script element', () => {
    const evil = {
      ...library,
      base: {
        ...library.base,
        rules: [{ text: '</script><script>alert(1)</script>', not: [], only: [] }],
      },
    };
    const json = serializeLibrary(evil);
    expect(json).not.toContain('<');
    expect(json).toContain('\\u003c/script>');
    expect(JSON.parse(json)).toEqual(evil);
  });
});
