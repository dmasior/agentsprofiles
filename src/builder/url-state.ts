import { normalizeSelection } from './selection';
import type { FragmentLibrary, Selection } from './types';
import { normalizeWorkingPreferences } from './working-preferences';

// Ids are lowercase slugs, so commas stay readable and need no encoding.
export function encodeSelection(selection: Selection): string {
  const parts: string[] = [];
  if (selection.focusAreas.length) parts.push(`f=${selection.focusAreas.join(',')}`);
  if (selection.context) parts.push(`c=${selection.context}`);
  if (selection.stack.length) parts.push(`s=${selection.stack.join(',')}`);
  if (selection.customInstructions?.trim())
    parts.push(`instructions=${encodeURIComponent(selection.customInstructions)}`);
  const preferences = normalizeWorkingPreferences(selection.preferences);
  if (preferences?.simplifiedEnglish) parts.push('ste=1');
  if (preferences?.comments) parts.push(`comments=${preferences.comments}`);
  if (preferences?.tdd) parts.push('tdd=1');
  return parts.length ? `?${parts.join('&')}` : '';
}

export function decodeSelection(search: string, library: FragmentLibrary): Selection {
  const params = new URLSearchParams(search);
  const list = (key: string): string[] =>
    params
      .getAll(key)
      .flatMap((value) => value.split(','))
      .map((id) => id.trim().toLowerCase())
      .filter(Boolean);

  const context = list('c').find((id) => library.contexts.some((c) => c.id === id)) ?? null;
  const comments = params.get('comments');
  return normalizeSelection(
    {
      focusAreas: list('f'),
      context,
      stack: list('s'),
      customInstructions: params.get('instructions') ?? undefined,
      preferences: {
        simplifiedEnglish: params.get('ste') === '1',
        comments: comments === 'minimal' || comments === 'none' ? comments : null,
        tdd: params.get('tdd') === '1',
      },
    },
    library,
  );
}
