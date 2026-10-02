import { describe, expect, it } from 'vitest';
import { emptyBody } from '../src/builder/parse-fragment';
import { filterStack, sortTech } from '../src/builder/stack-filter';
import type { TechFragment, TechGroupId } from '../src/builder/types';
import { library } from './fixtures';

const ids = (query: string) =>
  filterStack(library.tech, query).map((g) => [g.id, g.items.map((t) => t.id)]);

describe('filterStack', () => {
  it('returns all non-empty groups in group order for empty query', () => {
    expect(ids('')).toEqual([
      ['languages', ['csharp', 'cpp', 'go']],
      ['databases', ['postgresql']],
      ['testing', ['pytest']],
    ]);
    expect(filterStack(library.tech, '').map((g) => g.label)).toEqual([
      'Languages',
      'Databases',
      'Testing',
    ]);
  });

  it('treats a whitespace query as empty', () => {
    expect(ids('   ')).toEqual(ids(''));
  });

  it('matches aliases', () => {
    expect(ids('golang')).toEqual([['languages', ['go']]]);
  });

  it('matches case-insensitively', () => {
    expect(ids('POSTGRES')).toEqual([['databases', ['postgresql']]]);
  });

  it('matches special characters as plain text', () => {
    expect(ids('c++')).toEqual([['languages', ['cpp']]]);
    expect(ids('c#')).toEqual([['languages', ['csharp']]]);
    expect(ids('.net')).toEqual([['languages', ['csharp']]]);
  });

  it('returns no groups when nothing matches', () => {
    expect(filterStack(library.tech, 'zzz')).toEqual([]);
  });
});

describe('sortTech', () => {
  const t = (id: string, label: string, group: TechGroupId): TechFragment => ({
    id,
    label,
    group,
    aliases: [],
    commands: {},
    body: emptyBody(),
  });

  it('sorts by group order, then label case-insensitive', () => {
    const sorted = sortTech([
      t('pytest', 'pytest', 'testing'),
      t('go', 'go', 'languages'),
      t('postgresql', 'PostgreSQL', 'databases'),
      t('bash', 'Bash / Shell', 'languages'),
    ]);
    expect(sorted.map((x) => x.id)).toEqual(['bash', 'go', 'postgresql', 'pytest']);
  });
});
