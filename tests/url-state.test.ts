import { describe, expect, it } from 'vitest';
import { decodeSelection, encodeSelection } from '../src/builder/url-state';
import { library } from './fixtures';

const full = { focusAreas: ['backend', 'qa'], context: 'legacy', stack: ['go', 'pytest'] };

describe('encodeSelection', () => {
  it('returns empty string for empty selection', () => {
    expect(encodeSelection({ focusAreas: [], context: null, stack: [] })).toBe('');
  });

  it('encodes all params with plain commas', () => {
    expect(encodeSelection(full)).toBe('?f=backend,qa&c=legacy&s=go,pytest');
  });

  it('leaves out empty params', () => {
    expect(encodeSelection({ focusAreas: ['backend'], context: null, stack: [] })).toBe(
      '?f=backend',
    );
  });

  it('omits whitespace-only custom instructions', () => {
    expect(encodeSelection({ ...full, customInstructions: ' \n\t ' })).toBe(encodeSelection(full));
  });
});

describe('decodeSelection', () => {
  it('round-trips an encoded selection', () => {
    expect(decodeSelection(encodeSelection(full), library)).toEqual(full);
  });

  it.each(['minimal', 'none'] as const)(
    'round-trips working preferences with %s comments',
    (comments) => {
      const selection = {
        ...full,
        preferences: { simplifiedEnglish: true, comments, tdd: true },
      };
      const search = encodeSelection(selection);
      expect(search).toContain(`&ste=1&comments=${comments}&tdd=1`);
      expect(decodeSelection(search, library)).toEqual(selection);
    },
  );

  it('ignores invalid working preference values and omits disabled preferences', () => {
    expect(decodeSelection('?ste=yes&comments=verbose&tdd=true', library)).toEqual({
      focusAreas: [],
      context: null,
      stack: [],
    });
    expect(
      encodeSelection({
        ...full,
        preferences: { simplifiedEnglish: false, comments: null, tdd: false },
      }),
    ).toBe(encodeSelection(full));
  });

  it('accepts a query without the leading question mark', () => {
    expect(decodeSelection('f=qa', library).focusAreas).toEqual(['qa']);
  });

  it('drops unknown ids', () => {
    expect(decodeSelection('?f=backend,nope&c=zzz&s=go,rust', library)).toEqual({
      focusAreas: ['backend'],
      context: null,
      stack: ['go'],
    });
  });

  it('normalizes case, spaces, duplicates and order', () => {
    expect(decodeSelection('?f=QA,%20backend,qa&s=PYTEST', library)).toEqual({
      focusAreas: ['backend', 'qa'],
      context: null,
      stack: ['pytest'],
    });
  });

  it('accepts percent-encoded commas', () => {
    expect(decodeSelection('?f=backend%2Cqa', library).focusAreas).toEqual(['backend', 'qa']);
  });

  it('keeps the first valid context when more than one is given', () => {
    expect(decodeSelection('?c=nope,mvp,legacy', library).context).toBe('mvp');
    expect(decodeSelection('?c=legacy&c=mvp', library).context).toBe('legacy');
  });

  it('ignores malformed input without throwing', () => {
    expect(decodeSelection('?%E0%A4%A&f=qa', library).focusAreas).toEqual(['qa']);
    expect(decodeSelection('garbage', library)).toEqual({
      focusAreas: [],
      context: null,
      stack: [],
    });
    expect(decodeSelection('', library)).toEqual({ focusAreas: [], context: null, stack: [] });
  });

  it('round-trips custom Markdown without changing case, spacing or URL characters', () => {
    const selection = {
      ...full,
      customInstructions:
        '  ### Billing\n\n- Keep € amounts in minor units.\n- See https://example.com/?a=1&b=2#Notes + 50%.\n- </script><script>alert(1)</script>\n',
      preferences: { simplifiedEnglish: true, comments: 'minimal' as const, tdd: true },
    };
    const search = encodeSelection(selection);
    expect(search).not.toContain('<script>');
    expect(search).not.toContain('\n');
    expect(decodeSelection(search, library)).toEqual(selection);
  });

  it('supports custom instructions without presets', () => {
    const selection = {
      focusAreas: [],
      context: null,
      stack: [],
      customInstructions: '- Keep logs.',
    };
    expect(decodeSelection(encodeSelection(selection), library)).toEqual(selection);
  });
});
