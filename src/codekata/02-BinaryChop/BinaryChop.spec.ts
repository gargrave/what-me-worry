import { chopIterative, chopRecursive } from "./BinaryChop";

describe("Iterative chop", () => {
  const chop = chopIterative;

  it("correctly chops short arrays", () => {
    expect(chop(3, [])).toBe(-1);
    expect(chop(3, [1])).toBe(-1);
    expect(chop(1, [1])).toBe(0);
  });

  it("correctly chops 2-element arrays", () => {
    const arr = [4, 5];
    expect(chop(4, arr)).toBe(0);
    expect(chop(5, arr)).toBe(1);
  });

  it("correctly chops 3-element arrays", () => {
    const arr = [1, 3, 5];
    expect(chop(1, arr)).toBe(0);
    expect(chop(3, arr)).toBe(1);
    expect(chop(5, arr)).toBe(2);
    expect(chop(0, arr)).toBe(-1);
    expect(chop(2, arr)).toBe(-1);
    expect(chop(4, arr)).toBe(-1);
    expect(chop(6, arr)).toBe(-1);
  });

  it("correctly chops 4-element arrays", () => {
    const arr = [1, 3, 5, 7];
    expect(chop(3, arr)).toBe(1);
    expect(chop(5, arr)).toBe(2);
    expect(chop(7, arr)).toBe(3);
    expect(chop(0, arr)).toBe(-1);
    expect(chop(2, arr)).toBe(-1);
    expect(chop(4, arr)).toBe(-1);
    expect(chop(6, arr)).toBe(-1);
    expect(chop(8, arr)).toBe(-1);
  });

  it("correctly chops longer arrays", () => {
    const arr = [1, 2, 5, 7, 9, 10, 13, 18, 41];
    expect(chop(1, arr)).toBe(0);
    expect(chop(2, arr)).toBe(1);
    expect(chop(18, arr)).toBe(7);
    expect(chop(41, arr)).toBe(8);
  });
});

describe("Recursive chop", () => {
  const chop = chopRecursive;

  it("correctly chops short arrays", () => {
    expect(chop(3, [])).toBe(-1);
    expect(chop(3, [1])).toBe(-1);
    expect(chop(1, [1])).toBe(0);
  });

  it("correctly chops 2-element arrays", () => {
    const arr = [4, 5];
    expect(chop(4, arr)).toBe(0);
    expect(chop(5, arr)).toBe(1);
  });

  it("correctly chops 3-element arrays", () => {
    const arr = [1, 3, 5];
    expect(chop(1, arr)).toBe(0);
    expect(chop(3, arr)).toBe(1);
    expect(chop(5, arr)).toBe(2);
    expect(chop(0, arr)).toBe(-1);
    expect(chop(2, arr)).toBe(-1);
    expect(chop(4, arr)).toBe(-1);
    expect(chop(6, arr)).toBe(-1);
  });

  it("correctly chops 4-element arrays", () => {
    const arr = [1, 3, 5, 7];
    expect(chop(3, arr)).toBe(1);
    expect(chop(5, arr)).toBe(2);
    expect(chop(7, arr)).toBe(3);
    expect(chop(0, arr)).toBe(-1);
    expect(chop(2, arr)).toBe(-1);
    expect(chop(4, arr)).toBe(-1);
    expect(chop(6, arr)).toBe(-1);
    expect(chop(8, arr)).toBe(-1);
  });

  it("correctly chops longer arrays", () => {
    const arr = [1, 2, 5, 7, 9, 10, 13, 18, 41];
    expect(chop(1, arr)).toBe(0);
    expect(chop(2, arr)).toBe(1);
    expect(chop(18, arr)).toBe(7);
    expect(chop(41, arr)).toBe(8);
  });
});
