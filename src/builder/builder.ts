import { compose, countLines, formatLocalDate, LONG_FILE_LINES } from './compose';
import { changedLines } from './preview-changes';
import {
  emptySelection,
  isStepValid,
  maxReachableStep,
  normalizeSelection,
  setMember,
} from './selection';
import { filterStack } from './stack-filter';
import type { FragmentLibrary, Selection, Step } from './types';
import { decodeSelection, encodeSelection } from './url-state';

const FLASH_MS = 2000;
const COPY_FAILED = 'Copy failed. Select text manually.';
const LINK_FAILED = 'Copy failed. Use the address bar.';

const root = document.querySelector<HTMLElement>('[data-builder]');
const data = document.getElementById('fragments')?.textContent;
if (root && data) init(root, JSON.parse(data) as FragmentLibrary);

function init(root: HTMLElement, library: FragmentLibrary): void {
  const one = <T extends Element>(selector: string): T => {
    const el = root.querySelector<T>(selector);
    if (!el) throw new Error(`Builder markup is missing ${selector}`);
    return el;
  };
  const all = <T extends Element>(selector: string): T[] =>
    Array.from(root.querySelectorAll<T>(selector));

  const preview = one<HTMLPreElement>('[data-preview]');
  const lineCount = one<HTMLElement>('[data-line-count]');
  const longNote = one<HTMLElement>('[data-long-note]');
  const search = one<HTMLInputElement>('[data-stack-search]');
  const chips = one<HTMLUListElement>('[data-stack-chips]');
  const empty = one<HTMLElement>('[data-stack-empty]');
  const status = one<HTMLElement>('[data-status]');
  const simplifiedEnglish = one<HTMLInputElement>('[name="simplified-english"]');
  const minimizeComments = one<HTMLInputElement>('[name="minimize-comments"]');
  const tdd = one<HTMLInputElement>('[name="tdd"]');
  const customInstructions = one<HTMLTextAreaElement>('[name="custom-instructions"]');
  const techLabels = new Map(library.tech.map((t) => [t.id, t.label]));
  const date = formatLocalDate(new Date());
  const timers = new WeakMap<HTMLElement, number>();
  const wideLayout = window.matchMedia('(min-width: 960px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let selection: Selection = decodeSelection(location.search, library);
  let step: Step = maxReachableStep(selection);

  const markdown = () => compose(selection, library, date);
  const shareUrl = () => `${location.origin}${location.pathname}${encodeSelection(selection)}`;

  function update(next: Selection): void {
    selection = normalizeSelection(next, library);
    render(true);
  }

  function syncInputs(): void {
    for (const input of all<HTMLInputElement>('input[name="focus-area"]')) {
      input.checked = selection.focusAreas.includes(input.value);
    }
    for (const input of all<HTMLInputElement>('input[name="context"]')) {
      input.checked = selection.context === input.value;
    }
    for (const input of all<HTMLInputElement>('input[name="stack"]')) {
      input.checked = selection.stack.includes(input.value);
    }
    simplifiedEnglish.checked = selection.preferences?.simplifiedEnglish ?? false;
    minimizeComments.checked = selection.preferences?.comments === 'minimal';
    tdd.checked = selection.preferences?.tdd ?? false;
    customInstructions.value = selection.customInstructions ?? '';
  }

  function renderStackFilter(): void {
    const groups = filterStack(library.tech, search.value);
    const visibleTech = new Set(groups.flatMap((g) => g.items.map((t) => t.id)));
    const visibleGroups = new Set<string>(groups.map((g) => g.id));
    for (const el of all<HTMLElement>('[data-tech]'))
      el.hidden = !visibleTech.has(el.dataset.tech ?? '');
    for (const el of all<HTMLElement>('[data-group]'))
      el.hidden = !visibleGroups.has(el.dataset.group ?? '');
    empty.hidden = groups.length > 0;
  }

  function renderChips(): void {
    chips.replaceChildren(
      ...selection.stack.map((id) => {
        const label = techLabels.get(id) ?? id;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'chip';
        button.dataset.remove = id;
        button.setAttribute('aria-label', `Remove ${label}`);
        button.textContent = `${label} \u00d7`;
        const item = document.createElement('li');
        item.append(button);
        return item;
      }),
    );
  }

  function renderPreview(md: string, showChanges: boolean): void {
    const previous = preview.textContent ?? '';
    if (previous === md) return;

    if (!showChanges || !wideLayout.matches) {
      preview.textContent = md;
      return;
    }

    const changed = changedLines(previous, md);
    const lines = (md.match(/[^\n]*\n|[^\n]+$/g) ?? []).map((text, index) => {
      const line = document.createElement('span');
      line.textContent = text;
      if (changed.has(index)) line.className = 'preview-change';
      return line;
    });
    preview.replaceChildren(...lines);

    const firstChange = lines.find((line) => line.classList.contains('preview-change'));
    if (firstChange) {
      preview.scrollTo({
        top: Math.max(
          0,
          firstChange.getBoundingClientRect().top -
            preview.getBoundingClientRect().top +
            preview.scrollTop -
            24,
        ),
        behavior: reducedMotion.matches ? 'instant' : 'smooth',
      });
    }
  }

  function render(showChanges = false): void {
    const reachable = maxReachableStep(selection);
    if (step > reachable) step = reachable;

    for (const tab of all<HTMLButtonElement>('[data-step-tab]')) {
      const n = Number(tab.dataset.stepTab);
      tab.disabled = n > reachable;
      if (n === step) tab.setAttribute('aria-current', 'step');
      else tab.removeAttribute('aria-current');
    }
    for (const panel of all<HTMLElement>('[data-step-panel]')) {
      panel.hidden = Number(panel.dataset.stepPanel) !== step;
    }
    for (const next of all<HTMLButtonElement>('[data-next]')) {
      next.disabled = !isStepValid(selection, Number(next.dataset.next) as Step);
    }

    renderChips();

    const md = markdown();
    renderPreview(md, showChanges);
    const lines = countLines(md);
    lineCount.textContent = `${lines} lines`;
    longNote.hidden = lines <= LONG_FILE_LINES;

    history.replaceState(
      null,
      '',
      `${location.pathname}${encodeSelection(selection)}${location.hash}`,
    );
  }

  function go(target: Step): void {
    if (target < 1 || target > maxReachableStep(selection)) return;
    step = target;
    render();
    root.querySelector<HTMLElement>(`#step-${target}-title`)?.focus();
  }

  function flash(button: HTMLElement, text: string): void {
    const original = button.dataset.label ?? button.textContent ?? '';
    button.dataset.label = original;
    button.textContent = text;
    window.clearTimeout(timers.get(button));
    timers.set(
      button,
      window.setTimeout(() => {
        button.textContent = original;
      }, FLASH_MS),
    );
  }

  function announce(message: string): void {
    status.textContent = '';
    window.setTimeout(() => {
      status.textContent = message;
    }, 50);
  }

  function selectPreview(): void {
    const range = document.createRange();
    range.selectNodeContents(preview);
    const current = window.getSelection();
    current?.removeAllRanges();
    current?.addRange(range);
  }

  async function copy(button: HTMLElement, text: string, failMessage: string, onFail?: () => void) {
    try {
      await navigator.clipboard.writeText(text);
      flash(button, 'Copied');
      announce('Copied to clipboard.');
    } catch {
      flash(button, failMessage);
      announce(failMessage);
      onFail?.();
    }
  }

  function download(text: string): void {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AGENTS.md';
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  root.addEventListener('change', (event) => {
    const input = event.target;
    if (
      input instanceof HTMLInputElement &&
      ['simplified-english', 'minimize-comments', 'tdd'].includes(input.name)
    ) {
      update({
        ...selection,
        preferences: {
          simplifiedEnglish: simplifiedEnglish.checked,
          comments: minimizeComments.checked ? 'minimal' : null,
          tdd: tdd.checked,
        },
      });
      syncInputs();
      return;
    }
    if (!(input instanceof HTMLInputElement)) return;
    if (input.name === 'focus-area')
      update({
        ...selection,
        focusAreas: setMember(selection.focusAreas, input.value, input.checked),
      });
    else if (input.name === 'context') update({ ...selection, context: input.value });
    else if (input.name === 'stack')
      update({ ...selection, stack: setMember(selection.stack, input.value, input.checked) });
  });

  root.addEventListener('click', (event) => {
    const button =
      event.target instanceof Element ? event.target.closest<HTMLElement>('button') : null;
    if (!button) return;
    const d = button.dataset;

    if (d.stepTab) go(Number(d.stepTab) as Step);
    else if (d.next) go((Number(d.next) + 1) as Step);
    else if (d.back) go((Number(d.back) - 1) as Step);
    else if (d.remove) {
      update({ ...selection, stack: setMember(selection.stack, d.remove, false) });
      syncInputs();
      search.focus();
    } else if ('startOver' in d) {
      selection = emptySelection();
      search.value = '';
      syncInputs();
      renderStackFilter();
      go(1);
    } else if ('download' in d) download(markdown());
    else if ('copy' in d) void copy(button, markdown(), COPY_FAILED, selectPreview);
    else if ('copyLink' in d) void copy(button, shareUrl(), LINK_FAILED);
  });

  search.addEventListener('input', renderStackFilter);
  customInstructions.addEventListener('input', () => {
    update({ ...selection, customInstructions: customInstructions.value });
  });

  syncInputs();
  renderStackFilter();
  render();
  root.hidden = false;
}
