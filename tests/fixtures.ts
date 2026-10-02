import { emptyBody } from '../src/builder/parse-fragment';
import type { Bullet, FragmentBody, FragmentLibrary } from '../src/builder/types';

function b(text: string, cond: { not?: string[]; only?: string[] } = {}): Bullet {
  return { text, not: cond.not ?? [], only: cond.only ?? [] };
}

function body(parts: Partial<FragmentBody>): FragmentBody {
  return { ...emptyBody(), ...parts };
}

export const library: FragmentLibrary = {
  base: body({
    rules: [b('Read code first.'), b('Run tests.')],
    never: [b('Do not push.')],
  }),
  focusAreas: [
    {
      id: 'backend',
      label: 'APIs and backend',
      order: 1,
      scope: 'When changing APIs or server-side code:',
      body: body({
        rules: [b('Validate input.'), b('Run tests.')],
        'ask-first': [b('Change API.')],
      }),
    },
    {
      id: 'qa',
      label: 'Testing',
      order: 2,
      scope: 'When writing tests or fixing bugs:',
      body: body({ rules: [b('Test behavior.'), b('Validate input.')] }),
    },
  ],
  contexts: [
    {
      id: 'legacy',
      label: 'Legacy',
      order: 1,
      description: 'Old code.',
      summary: 'Legacy summary.',
      body: body({ rules: [b('Smallest change.')], never: [b('Do not refactor.')] }),
    },
    {
      id: 'mvp',
      label: 'MVP',
      order: 2,
      description: 'New code.',
      summary: 'MVP summary.',
      body: body({ rules: [b('Keep it simple.')] }),
    },
  ],
  tech: [
    {
      id: 'csharp',
      label: 'C#',
      group: 'languages',
      aliases: ['dotnet', '.net'],
      commands: {},
      body: body({ rules: [b('Use nullable types.')] }),
    },
    {
      id: 'cpp',
      label: 'C++',
      group: 'languages',
      aliases: ['cplusplus'],
      commands: {},
      body: body({ rules: [b('Use RAII.')] }),
    },
    {
      id: 'go',
      label: 'Go',
      group: 'languages',
      aliases: ['golang'],
      commands: { build: 'go build ./...', test: 'go test ./...' },
      body: body({ rules: [b('Handle errors.'), b('Refactor freely.', { not: ['legacy'] })] }),
    },
    {
      id: 'postgresql',
      label: 'PostgreSQL',
      group: 'databases',
      aliases: ['postgres'],
      commands: {},
      body: body({ rules: [b('Use migrations.'), b('Only in legacy.', { only: ['legacy'] })] }),
    },
    {
      id: 'pytest',
      label: 'pytest',
      group: 'testing',
      aliases: [],
      commands: { test: 'pytest' },
      body: body({ rules: [b('Use fixtures.')] }),
    },
  ],
};
