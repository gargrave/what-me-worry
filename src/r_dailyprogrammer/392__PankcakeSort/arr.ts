function getRandomInt(min: number, max: number): number {
  const _min = Math.ceil(min);
  const _max = Math.floor(max);
  return Math.floor(Math.random() * (_max - _min + 1)) + _min;
}

export function getNumArray(len: number): number[] {
  const arr: number[] = [];
  for (let i = 1; i <= len; i++) {
    arr.push(i);
    // add some duplicate values every few times
    if (Math.random() < 0.35) {
      arr.push(i);
    }
  }
  return arr;
}

export function shuffleArray(other: number[]): number[] {
  const arr = Array.from(other);

  for (let i = arr.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
}
