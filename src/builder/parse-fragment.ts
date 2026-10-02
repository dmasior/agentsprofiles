import { SECTION_KEYS, type Bullet, type FragmentBody, type SectionKey } from './types';

const CONDITION = /<!--\s*(not|only):\s*([^>]*?)\s*-->$/;
const CONTEXT_ID = /^[a-z0-9-]+$/;

interface PendingBullet {
  section: SectionKey;
  text: string;
  where: string;
}

export function emptyBody(): FragmentBody {
  return { rules: [], always: [], 'ask-first': [], never: [] };
}

export function parseFragmentBody(source: string, file: string): FragmentBody {
  const pending: PendingBullet[] = [];
  let section: SectionKey | null = null;
  let last: PendingBullet | null = null;

  const lines = source.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimEnd();
    const where = `${file}:${i + 1}`;

    if (line.trim() === '') {
      last = null;
      continue;
    }

    const heading = /^##\s+(.+)$/.exec(line);
    if (heading) {
      const key = heading[1].trim();
      if (!isSectionKey(key)) throw new Error(`${where}: unknown section "${key}"`);
      section = key;
      last = null;
      continue;
    }

    const bullet = /^-\s+(.*)$/.exec(line);
    if (bullet) {
      if (!section) throw new Error(`${where}: bullet before any "## <section>" heading`);
      last = { section, text: bullet[1], where };
      pending.push(last);
      continue;
    }

    if (last && /^\s/.test(line)) {
      last.text += ` ${line.trim()}`;
      continue;
    }

    throw new Error(`${where}: expected "## <section>" or "- <bullet>"`);
  }

  const body = emptyBody();
  for (const item of pending) body[item.section].push(parseBullet(item.text, item.where));
  return body;
}

function parseBullet(raw: string, where: string): Bullet {
  let text = raw.trim();
  const bullet: Bullet = { text, not: [], only: [] };

  const match = CONDITION.exec(text);
  if (match) {
    const ids = match[2].split(',').map((id) => id.trim());
    if (ids.some((id) => !CONTEXT_ID.test(id))) {
      throw new Error(`${where}: invalid context id list "${match[2]}"`);
    }
    bullet[match[1] as 'not' | 'only'] = ids;
    text = text.slice(0, match.index).trim();
  }

  if (text.includes('<!--')) throw new Error(`${where}: malformed condition comment`);
  if (!text) throw new Error(`${where}: empty bullet`);

  bullet.text = text.replace(/\s+/g, ' ');
  return bullet;
}

function isSectionKey(value: string): value is SectionKey {
  return (SECTION_KEYS as readonly string[]).includes(value);
}
