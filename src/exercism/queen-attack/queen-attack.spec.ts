import QueenAttack, { BoardState } from "./queen-attack";

describe("Queens", () => {
  it("initialized with specific placement", () => {
    const queens = new QueenAttack({ white: [3, 7], black: [6, 1] });
    expect(queens.white).toEqual([3, 7]);
    expect(queens.black).toEqual([6, 1]);
  });

  it("cannot occupy the same space", () => {
    const positioning: BoardState = {
      black: [2, 4],
      white: [2, 4],
    };
    const expectedError = "Queens cannot share the same space";
    expect(() => new QueenAttack(positioning)).toThrow(expectedError);
  });

  it("toString representation", () => {
    const positioning: BoardState = {
      white: [2, 4],
      black: [6, 6],
    };
    const queens = new QueenAttack(positioning);
    const board = [
      "_ _ _ _ _ _ _ _",
      "_ _ _ _ _ _ _ _",
      "_ _ _ _ W _ _ _",
      "_ _ _ _ _ _ _ _",
      "_ _ _ _ _ _ _ _",
      "_ _ _ _ _ _ _ _",
      "_ _ _ _ _ _ B _",
      "_ _ _ _ _ _ _ _",
    ].join("\n");
    expect(queens.toString()).toEqual(board);
  });

  it("queens cannot attack", () => {
    const queens = new QueenAttack({ white: [2, 3], black: [4, 7] });
    expect(queens.canAttack()).toBe(false);
  });

  it("queens can attack when they are on the same row", () => {
    const queens = new QueenAttack({ white: [2, 4], black: [2, 7] });
    expect(queens.canAttack()).toBe(true);
  });

  it("queens can attack when they are on the same column", () => {
    const queens = new QueenAttack({ white: [5, 4], black: [2, 4] });
    expect(queens.canAttack()).toBe(true);
  });

  it("queens can attack diagonally", () => {
    const queens = new QueenAttack({ white: [1, 1], black: [6, 6] });
    expect(queens.canAttack()).toBe(true);
  });

  it("queens can attack another diagonally", () => {
    const queens = new QueenAttack({ white: [0, 6], black: [1, 7] });
    expect(queens.canAttack()).toBe(true);
  });

  it("queens can attack yet another diagonally", () => {
    const queens = new QueenAttack({ white: [4, 1], black: [6, 3] });
    expect(queens.canAttack()).toBe(true);
  });

  it("queens can attack on a north-east/south-west diagonal", () => {
    const queens = new QueenAttack({ white: [7, 0], black: [0, 7] });
    expect(queens.canAttack()).toBe(true);
  });

  it("queens can attack on another ne/sw diagonal", () => {
    const queens = new QueenAttack({ white: [2, 6], black: [5, 3] });
    expect(queens.canAttack()).toBe(true);
  });
});
