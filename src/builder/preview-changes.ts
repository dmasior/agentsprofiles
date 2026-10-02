// Return new line indexes; deletions point to the nearest remaining line.
export function changedLines(previous: string, next: string): Set<number> {
  const before = previous ? previous.replace(/\n$/, '').split('\n') : [];
  const after = next ? next.replace(/\n$/, '').split('\n') : [];
  const lengths = Array.from(
    { length: before.length + 1 },
    () => new Uint32Array(after.length + 1),
  );

  for (let i = before.length - 1; i >= 0; i--) {
    for (let j = after.length - 1; j >= 0; j--) {
      lengths[i][j] =
        before[i] === after[j]
          ? lengths[i + 1][j + 1] + 1
          : Math.max(lengths[i + 1][j], lengths[i][j + 1]);
    }
  }

  const changed = new Set<number>();
  let i = 0;
  let j = 0;
  while (i < before.length || j < after.length) {
    if (i < before.length && j < after.length && before[i] === after[j]) {
      i++;
      j++;
    } else if (
      j < after.length &&
      (i === before.length || lengths[i][j + 1] >= lengths[i + 1][j])
    ) {
      changed.add(j++);
    } else {
      if (after.length && !changed.has(j - 1)) changed.add(Math.min(j, after.length - 1));
      i++;
    }
  }
  return changed;
}
