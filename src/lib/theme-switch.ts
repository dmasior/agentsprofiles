import { isThemePref, readPref, resolveTheme, writePref } from './theme';

function safeStorage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

const media = window.matchMedia('(prefers-color-scheme: dark)');
const storage = safeStorage();
let pref = readPref(storage);

function apply(): void {
  document.documentElement.dataset.theme = resolveTheme(pref, media.matches);
}

const control = document.querySelector<HTMLFieldSetElement>('[data-theme-switch]');
if (control) {
  for (const input of control.querySelectorAll<HTMLInputElement>('input[name="theme"]')) {
    input.checked = input.value === pref;
  }
  control.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || !isThemePref(target.value)) return;
    pref = target.value;
    writePref(storage, pref);
    apply();
  });
  control.hidden = false;
}

media.addEventListener('change', apply);
apply();
