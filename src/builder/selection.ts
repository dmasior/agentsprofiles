import type { FragmentLibrary, Selection, Step } from './types';
import { normalizeWorkingPreferences } from './working-preferences';

const STEP_CHECKS: Record<Step, (selection: Selection) => boolean> = {
  1: (s) => s.context !== null,
  2: () => true,
  3: (s) => s.stack.length > 0,
  4: () => true,
};

export function emptySelection(): Selection {
  return { focusAreas: [], context: null, stack: [] };
}

export function normalizeSelection(selection: Selection, library: FragmentLibrary): Selection {
  const focusAreas = new Set(selection.focusAreas);
  const stack = new Set(selection.stack);
  const preferences = normalizeWorkingPreferences(selection.preferences);
  return {
    focusAreas: library.focusAreas.filter((area) => focusAreas.has(area.id)).map((area) => area.id),
    context: library.contexts.some((c) => c.id === selection.context) ? selection.context : null,
    stack: library.tech.filter((t) => stack.has(t.id)).map((t) => t.id),
    ...(selection.customInstructions ? { customInstructions: selection.customInstructions } : {}),
    ...(preferences ? { preferences } : {}),
  };
}

export function isStepValid(selection: Selection, step: Step): boolean {
  return STEP_CHECKS[step](selection);
}

export function maxReachableStep(selection: Selection): Step {
  if (!isStepValid(selection, 1)) return 1;
  if (!isStepValid(selection, 3)) return 3;
  return 4;
}

export function isComplete(selection: Selection): boolean {
  return ([1, 2, 3] as const).every((step) => isStepValid(selection, step));
}

export function setMember(list: string[], id: string, on: boolean): string[] {
  const without = list.filter((item) => item !== id);
  return on ? [...without, id] : without;
}
