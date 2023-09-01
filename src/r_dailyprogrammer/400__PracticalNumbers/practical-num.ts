function getDivisors(value: number): number[] {
  const max = Math.ceil(value / 4);
  const d: Record<number, number> = { 1: 1 };
  if (value % 2 === 0) {
    d[2] = 2;
    d[value / 2] = value / 2;
  }

  for (let i = max; i >= 3; i -= 1) {
    if (value % i === 0) {
      d[i] = i;
      d[value / i] = value / i;
    }
  }
  return Object.values(d).sort((a, b) => (a > b ? 1 : -1));
}

function canAddTo(value: number, divs: number[]): boolean {
  let sum = 0;

  const last = divs.length - 1;
  for (let i = last; i >= 0; i -= 1) {
    const div = divs[i];
    if (sum + div <= value) {
      sum += div;
    }
    if (sum === value) return true;
  }
  return false;
}

function isPractical(value: number): boolean {
  const divisors = getDivisors(value);

  for (let i = 2; i < value; i += 1) {
    const result = canAddTo(i, divisors);
    if (!result) return false;
  }
  return true;
}

export function run(max: number) {
  const matches: Record<number, number> = { 1: 1 };

  for (let i = 2; i <= max; i += 2) {
    if (i in matches) continue;
    if (isPractical(i)) {
      matches[i] = i;
      // for each practical num, we know that we can safely double it to max,
      // so we can avoid calculating these numbers in future iterations
      for (let j = i; j < max; j *= 2) {
        matches[j] = j;
      }
    }
  }

  return Object.values(matches).reduce((acc, val) => acc + val, 0);
}
