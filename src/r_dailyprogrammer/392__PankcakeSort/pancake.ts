import _ from "lodash/fp";

export let ffCalls = 0;

export function flipFront(arr: number[], count: number): number[] {
  ffCalls += 1;

  const max = Math.floor(count / 2);
  for (let i = 0; i < max; i += 1) {
    const idx = count - 1 - i;
    const temp = arr[idx];
    if (arr[idx] !== arr[i]) {
      arr[idx] = arr[i];
      arr[i] = temp;
    }
  }
  return arr;
}

const ff = _.curryRight(flipFront);
const shiftToEnd = _.curryRight(
  (arr: number[], maxIdx: number, endIdx: number): number[] =>
    _.pipe(ff(maxIdx + 1), ff(endIdx + 1))(arr)
);

const findMaxIdx = (arr: number[], maxIdx: number): number =>
  arr.reduce(
    (max, val, idx) => (idx > maxIdx ? max : val > arr[max] ? idx : max),
    0
  );

function iterate(arr: number[], endIdx: number) {
  const maxIdx = findMaxIdx(arr, endIdx);
  if (maxIdx < endIdx) {
    shiftToEnd(arr, maxIdx, endIdx);
  }
  return arr;
}

export function pancakeSort(arr: number[]): number[] {
  ffCalls = 0;

  for (let i = arr.length - 1; i > 0; i -= 1) {
    iterate(arr, i);
  }
  return arr;
}
