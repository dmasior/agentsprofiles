import { TECH_GROUP_IDS, TECH_GROUP_LABELS, type TechFragment, type TechGroupId } from './types';

export interface StackGroup {
  id: TechGroupId;
  label: string;
  items: TechFragment[];
}

export function filterStack(tech: TechFragment[], query: string): StackGroup[] {
  const needle = query.trim().toLowerCase();
  const matches = (item: TechFragment) =>
    !needle || [item.label, item.id, ...item.aliases].some((s) => s.toLowerCase().includes(needle));

  return TECH_GROUP_IDS.map((id) => ({
    id,
    label: TECH_GROUP_LABELS[id],
    items: tech.filter((item) => item.group === id && matches(item)),
  })).filter((group) => group.items.length > 0);
}

export function sortTech(tech: TechFragment[]): TechFragment[] {
  return [...tech].sort(
    (a, b) =>
      TECH_GROUP_IDS.indexOf(a.group) - TECH_GROUP_IDS.indexOf(b.group) ||
      a.label.localeCompare(b.label, 'en', { sensitivity: 'base' }),
  );
}
