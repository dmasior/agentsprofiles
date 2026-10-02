import type { WorkingPreferences } from './types';

export function normalizeWorkingPreferences(
  value?: WorkingPreferences,
): WorkingPreferences | undefined {
  const preferences: WorkingPreferences = {
    simplifiedEnglish: value?.simplifiedEnglish === true,
    comments: value?.comments === 'minimal' || value?.comments === 'none' ? value.comments : null,
    tdd: value?.tdd === true,
  };
  return preferences.simplifiedEnglish || preferences.comments || preferences.tdd
    ? preferences
    : undefined;
}

export function workingPreferenceRules(preferences?: WorkingPreferences): string[] {
  const rules: string[] = [];
  if (preferences?.simplifiedEnglish)
    rules.push('Write using ASD-STE100 simplified technical English.');
  if (preferences?.comments === 'minimal')
    rules.push(
      'Keep code comments minimal. Explain only non-obvious intent. Do not restate the code.',
    );
  if (preferences?.comments === 'none') rules.push('Do not add code comments.');
  if (preferences?.tdd)
    rules.push(
      'Use test-driven development (TDD). Write a failing test before implementation. Run it to confirm the expected failure. Write the minimum code needed to pass. Refactor while keeping tests green.',
    );
  return rules;
}

const DEFAULT_COMMENT_RULES = new Set([
  'Add comments only for intent that the code does not show.',
  'Add `///` doc comments to public APIs.',
]);

export function isOverriddenCommentRule(text: string, preferences?: WorkingPreferences): boolean {
  return Boolean(preferences?.comments && DEFAULT_COMMENT_RULES.has(text));
}
