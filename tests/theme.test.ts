import { describe, expect, it, vi } from 'vitest';
import { isThemePref, readPref, resolveTheme, THEME_KEY, writePref } from '../src/lib/theme';

const throwing = {
  getItem: () => {
    throw new Error('blocked');
  },
  setItem: () => {
    throw new Error('blocked');
  },
  removeItem: () => {
    throw new Error('blocked');
  },
};

describe('readPref', () => {
  it('returns system without storage', () => {
    expect(readPref(null)).toBe('system');
  });

  it('returns system when storage throws', () => {
    expect(readPref(throwing)).toBe('system');
  });

  it('returns system for missing or invalid values', () => {
    expect(readPref({ getItem: () => null })).toBe('system');
    expect(readPref({ getItem: () => 'purple' })).toBe('system');
  });

  it('returns stored light or dark', () => {
    expect(readPref({ getItem: () => 'light' })).toBe('light');
    expect(readPref({ getItem: () => 'dark' })).toBe('dark');
  });
});

describe('writePref', () => {
  it('stores light and dark, removes the key for system', () => {
    const storage = { setItem: vi.fn(), removeItem: vi.fn() };
    writePref(storage, 'dark');
    expect(storage.setItem).toHaveBeenCalledWith(THEME_KEY, 'dark');
    writePref(storage, 'system');
    expect(storage.removeItem).toHaveBeenCalledWith(THEME_KEY);
  });

  it('does not throw when storage is blocked or missing', () => {
    expect(() => writePref(throwing, 'light')).not.toThrow();
    expect(() => writePref(null, 'light')).not.toThrow();
  });
});

describe('resolveTheme', () => {
  it('follows the OS only for system', () => {
    expect(resolveTheme('system', true)).toBe('dark');
    expect(resolveTheme('system', false)).toBe('light');
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
  });
});

describe('isThemePref', () => {
  it('accepts only the three values', () => {
    expect(['light', 'dark', 'system'].every(isThemePref)).toBe(true);
    expect(isThemePref('auto')).toBe(false);
    expect(isThemePref(undefined)).toBe(false);
  });
});
