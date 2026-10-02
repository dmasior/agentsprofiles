export type ThemePref = 'light' | 'dark' | 'system';

export const THEME_KEY = 'theme';

export function isThemePref(value: unknown): value is ThemePref {
  return value === 'light' || value === 'dark' || value === 'system';
}

export function readPref(storage: Pick<Storage, 'getItem'> | null): ThemePref {
  try {
    const value = storage?.getItem(THEME_KEY);
    return value === 'light' || value === 'dark' ? value : 'system';
  } catch {
    return 'system';
  }
}

export function writePref(
  storage: Pick<Storage, 'setItem' | 'removeItem'> | null,
  pref: ThemePref,
): void {
  try {
    if (pref === 'system') storage?.removeItem(THEME_KEY);
    else storage?.setItem(THEME_KEY, pref);
  } catch {
    // Blocked storage only means the choice is not remembered.
  }
}

export function resolveTheme(pref: ThemePref, prefersDark: boolean): 'light' | 'dark' {
  if (pref === 'system') return prefersDark ? 'dark' : 'light';
  return pref;
}
