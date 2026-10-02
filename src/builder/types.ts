export const SECTION_KEYS = ['rules', 'always', 'ask-first', 'never'] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export const COMMAND_KEYS = ['install', 'build', 'test', 'lint', 'format', 'run'] as const;
export type CommandKey = (typeof COMMAND_KEYS)[number];

export const TECH_GROUP_IDS = [
  'languages',
  'frontend',
  'backend',
  'mobile',
  'databases',
  'infra',
  'testing',
  'data-ml',
  'design',
] as const;
export type TechGroupId = (typeof TECH_GROUP_IDS)[number];

export const TECH_GROUP_LABELS: Record<TechGroupId, string> = {
  languages: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  databases: 'Databases',
  infra: 'Infra / Cloud',
  testing: 'Testing',
  'data-ml': 'Data / ML',
  design: 'Design',
};

export interface Bullet {
  text: string;
  not: string[];
  only: string[];
}

export type FragmentBody = Record<SectionKey, Bullet[]>;

export interface FocusAreaFragment {
  id: string;
  label: string;
  order: number;
  scope: string;
  body: FragmentBody;
}

export interface ContextFragment {
  id: string;
  label: string;
  order: number;
  description: string;
  summary: string;
  body: FragmentBody;
}

export interface TechFragment {
  id: string;
  label: string;
  group: TechGroupId;
  aliases: string[];
  commands: Partial<Record<CommandKey, string>>;
  body: FragmentBody;
}

export interface FragmentLibrary {
  base: FragmentBody;
  focusAreas: FocusAreaFragment[];
  contexts: ContextFragment[];
  tech: TechFragment[];
}

export interface Selection {
  focusAreas: string[];
  context: string | null;
  stack: string[];
  customInstructions?: string;
  preferences?: WorkingPreferences;
}

export interface WorkingPreferences {
  simplifiedEnglish: boolean;
  comments: 'minimal' | 'none' | null;
  tdd: boolean;
}

export type Step = 1 | 2 | 3 | 4;
