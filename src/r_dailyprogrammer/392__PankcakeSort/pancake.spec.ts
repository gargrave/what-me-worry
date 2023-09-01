import { ffCalls, flipFront, pancakeSort } from "./pancake";
import { getNumArray, shuffleArray } from "./arr";

describe("Flip Front", () => {
  it("flips the requested values correctly", () => {
    expect(flipFront([0, 1, 2, 3, 4], 2)).toEqual([1, 0, 2, 3, 4]);
    expect(flipFront([0, 1, 2, 3, 4], 3)).toEqual([2, 1, 0, 3, 4]);
    expect(flipFront([0, 1, 2, 3, 4], 5)).toEqual([4, 3, 2, 1, 0]);
    expect(flipFront([1, 2, 2, 2], 3)).toEqual([2, 2, 1, 2]);
  });
});

describe("Pancake Sort", () => {
  it("performs a full array sort", () => {
    expect(pancakeSort([3, 1, 2, 1])).toEqual([1, 1, 2, 3]);
    console.log({ ffCalls });

    const aIn = [2, 4, 6, 2, 4, 11, 3, 5, 1];
    const aOut = [1, 2, 2, 3, 4, 4, 5, 6, 11];
    expect(pancakeSort(aIn)).toEqual(aOut);
    console.log({ ffCalls });
  });
});

describe("Massive List", () => {
  it("sorts a huge list in the fewest possible calls", () => {
    const len = 10_000;
    const control = getNumArray(len);
    const rand = shuffleArray(control);
    const result = pancakeSort(rand);
    expect(result).toEqual(control);
    console.log({ ffCalls });
  });
});
