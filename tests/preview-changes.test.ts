import { describe, expect, it } from 'vitest';
import { changedLines } from '../src/builder/preview-changes';

describe('changedLines', () => {
  it('finds separate additions without highlighting shifted unchanged lines', () => {
    expect(
      changedLines('context\nroles\nstack\n', 'context\nnew role\nroles\nnew tech\nstack\n'),
    ).toEqual(new Set([1, 3]));
  });

  it('highlights replacement text', () => {
    expect(changedLines('context\nold\nstack\n', 'context\nnew\nstack\n')).toEqual(new Set([1]));
  });

  it('anchors removed content to the next remaining line', () => {
    expect(changedLines('context\nrole\nstack\n', 'context\nstack\n')).toEqual(new Set([1]));
  });

  it('anchors trailing deletions to the final remaining line', () => {
    expect(changedLines('context\nrole\nstack\n', 'context\n')).toEqual(new Set([0]));
  });

  it('handles unchanged and empty content', () => {
    expect(changedLines('same\n', 'same\n')).toEqual(new Set());
    expect(changedLines('', 'new\n')).toEqual(new Set([0]));
    expect(changedLines('old\n', '')).toEqual(new Set());
  });
});
