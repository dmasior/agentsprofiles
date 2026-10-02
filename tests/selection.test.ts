import { describe, expect, it } from 'vitest';
import {
  emptySelection,
  isComplete,
  isStepValid,
  maxReachableStep,
  normalizeSelection,
  setMember,
} from '../src/builder/selection';
import { library } from './fixtures';

describe('normalizeSelection', () => {
  it('drops unknown ids, removes duplicates and sorts into library order', () => {
    expect(
      normalizeSelection(
        {
          focusAreas: ['qa', 'nope', 'backend', 'qa'],
          context: 'mvp',
          stack: ['pytest', 'go', 'go', 'rust'],
        },
        library,
      ),
    ).toEqual({ focusAreas: ['backend', 'qa'], context: 'mvp', stack: ['go', 'pytest'] });
  });

  it('sets unknown context to null', () => {
    expect(
      normalizeSelection({ focusAreas: [], context: 'nope', stack: [] }, library).context,
    ).toBeNull();
  });

  it('preserves custom instruction whitespace while users type', () => {
    const customInstructions = '  - Keep spacing.\n\n';
    expect(
      normalizeSelection({ ...emptySelection(), customInstructions }, library).customInstructions,
    ).toBe(customInstructions);
    expect(normalizeSelection({ ...emptySelection(), customInstructions: '' }, library)).toEqual(
      emptySelection(),
    );
  });
});

describe('steps', () => {
  const complete = { focusAreas: ['qa'], context: 'mvp', stack: ['go'] };

  it('validates each step', () => {
    expect(isStepValid(emptySelection(), 1)).toBe(false);
    expect(isStepValid(complete, 1)).toBe(true);
    expect(isStepValid({ ...complete, context: null }, 1)).toBe(false);
    expect(isStepValid({ ...complete, focusAreas: [] }, 2)).toBe(true);
    expect(isStepValid(complete, 2)).toBe(true);
    expect(isStepValid({ ...complete, stack: [] }, 3)).toBe(false);
    expect(isStepValid(complete, 3)).toBe(true);
    expect(isStepValid(complete, 4)).toBe(true);
    expect(isStepValid(emptySelection(), 4)).toBe(true);
  });

  it('computes the furthest reachable step', () => {
    expect(maxReachableStep(emptySelection())).toBe(1);
    expect(maxReachableStep({ focusAreas: ['qa'], context: null, stack: [] })).toBe(1);
    expect(maxReachableStep({ focusAreas: [], context: 'mvp', stack: [] })).toBe(3);
    expect(maxReachableStep({ focusAreas: ['qa'], context: 'mvp', stack: [] })).toBe(3);
    expect(maxReachableStep(complete)).toBe(4);
  });

  it('keeps all steps reachable when optional focus areas are cleared', () => {
    const cleared = { ...complete, focusAreas: [] };
    expect(maxReachableStep(cleared)).toBe(4);
    expect(isComplete(cleared)).toBe(true);
  });

  it('locks steps 2 and 3 when project context is cleared', () => {
    expect(maxReachableStep({ ...complete, context: null })).toBe(1);
  });

  it('is complete only when all steps are valid', () => {
    expect(isComplete(complete)).toBe(true);
    expect(isComplete({ ...complete, stack: [] })).toBe(false);
  });

  it('locks working preferences when the stack is cleared and resets optional fields', () => {
    const selection = {
      ...complete,
      customInstructions: '- Keep an audit trail.',
      preferences: { simplifiedEnglish: true, comments: 'none' as const, tdd: true },
    };
    expect(maxReachableStep(selection)).toBe(4);
    expect(maxReachableStep({ ...selection, stack: [] })).toBe(3);
    expect(normalizeSelection(selection, library).preferences).toEqual(selection.preferences);
    expect(emptySelection().preferences).toBeUndefined();
    expect(emptySelection().customInstructions).toBeUndefined();
  });
});

describe('setMember', () => {
  it('adds and removes ids without duplicates', () => {
    expect(setMember(['a'], 'b', true)).toEqual(['a', 'b']);
    expect(setMember(['a', 'b'], 'b', true)).toEqual(['a', 'b']);
    expect(setMember(['a', 'b'], 'a', false)).toEqual(['b']);
    expect(setMember([], 'a', false)).toEqual([]);
  });
});
