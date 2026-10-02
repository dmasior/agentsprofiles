import { describe, expect, it } from 'vitest';
import { emptyBody, parseFragmentBody } from '../src/builder/parse-fragment';

describe('parseFragmentBody', () => {
  it('parses sections and bullets', () => {
    const body = parseFragmentBody(
      ['## rules', '- First rule.', '- Second rule.', '', '## never', '- Do not do it.'].join('\n'),
      'x.md',
    );
    expect(body.rules.map((b) => b.text)).toEqual(['First rule.', 'Second rule.']);
    expect(body.never.map((b) => b.text)).toEqual(['Do not do it.']);
    expect(body.always).toEqual([]);
    expect(body['ask-first']).toEqual([]);
  });

  it('returns an empty body for empty source', () => {
    expect(parseFragmentBody('', 'x.md')).toEqual(emptyBody());
  });

  it('parses not and only conditions and removes the comment', () => {
    const body = parseFragmentBody(
      [
        '## rules',
        '- Refactor freely. <!-- not: legacy-maintenance, regulated -->',
        '- Keep audit logs. <!--only:regulated-->',
      ].join('\n'),
      'x.md',
    );
    expect(body.rules).toEqual([
      { text: 'Refactor freely.', not: ['legacy-maintenance', 'regulated'], only: [] },
      { text: 'Keep audit logs.', not: [], only: ['regulated'] },
    ]);
  });

  it('joins indented continuation lines into the bullet', () => {
    const body = parseFragmentBody(
      ['## rules', '- Long rule that', '  continues here. <!-- not: monorepo -->'].join('\n'),
      'x.md',
    );
    expect(body.rules).toEqual([
      { text: 'Long rule that continues here.', not: ['monorepo'], only: [] },
    ]);
  });

  it('handles CRLF line endings', () => {
    const body = parseFragmentBody('## rules\r\n- One.\r\n', 'x.md');
    expect(body.rules.map((b) => b.text)).toEqual(['One.']);
  });

  it('collapses inner whitespace', () => {
    const body = parseFragmentBody('## rules\n-   Many    spaces   here.', 'x.md');
    expect(body.rules[0].text).toBe('Many spaces here.');
  });

  it('throws on unknown section with file and line', () => {
    expect(() => parseFragmentBody('## rules\n- A.\n## tips\n- B.', 'focus-areas/qa.md')).toThrow(
      'focus-areas/qa.md:3: unknown section "tips"',
    );
  });

  it('throws on bullet before any heading', () => {
    expect(() => parseFragmentBody('- Orphan.', 'x.md')).toThrow('x.md:1: bullet before any');
  });

  it('throws on stray text', () => {
    expect(() => parseFragmentBody('## rules\nSome paragraph.', 'x.md')).toThrow(
      'x.md:2: expected "## <section>" or "- <bullet>"',
    );
  });

  it('throws on H1 and H3 headings', () => {
    expect(() => parseFragmentBody('# Title', 'x.md')).toThrow('x.md:1: expected');
    expect(() => parseFragmentBody('### rules', 'x.md')).toThrow('x.md:1: expected');
  });

  it('throws on malformed condition comment', () => {
    expect(() => parseFragmentBody('## rules\n- Rule. <!-- nope: x -->', 'x.md')).toThrow(
      'x.md:2: malformed condition comment',
    );
  });

  it('throws on invalid context id in condition', () => {
    expect(() => parseFragmentBody('## rules\n- Rule. <!-- not: Bad_Id -->', 'x.md')).toThrow(
      'x.md:2: invalid context id list',
    );
  });
});
