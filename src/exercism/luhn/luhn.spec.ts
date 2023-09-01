import { isValidLuhn } from "./luhn";

describe("luhn", () => {
  it("single digit strings can not be valid", () => {
    expect(isValidLuhn("1")).toBe(false);
  });

  it("a single zero is invalid", () => {
    expect(isValidLuhn("0")).toBe(false);
  });

  it("a simple valid SIN that remains valid if reversed", () => {
    expect(isValidLuhn("059")).toBe(true);
  });

  it("a valid Canadian SIN", () => {
    expect(isValidLuhn("055 444 285")).toBe(true);
  });

  it("invalid Canadian SIN", () => {
    expect(isValidLuhn("055 444 286")).toBe(false);
  });

  it("invalid credit card", () => {
    expect(isValidLuhn("8273 1232 7352 0569")).toBe(false);
  });

  it("valid strings with a non-digit included become invalid", () => {
    expect(isValidLuhn("055a 444 285")).toBe(false);
  });

  it("valid strings with punctuation included become invalid", () => {
    expect(isValidLuhn("055-444-285")).toBe(false);
  });

  it("valid strings with symbols included become invalid", () => {
    expect(isValidLuhn("055£ 444$ 285")).toBe(false);
  });

  it("single zero with space is invalid", () => {
    expect(isValidLuhn(" 0")).toBe(false);
  });

  it("input digit 9 is correctly converted to output digit 9", () => {
    expect(isValidLuhn("091")).toBe(true);
  });
});
