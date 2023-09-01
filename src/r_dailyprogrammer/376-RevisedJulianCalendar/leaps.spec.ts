import { leaps } from "./leaps";

describe("Revised Julian Calendar", () => {
  it("correctly finds 1 leap year between 2016/2017", () => {
    const result = leaps(2016, 2017);
    expect(result).toBe(1);
  });

  it("correctly finds 0 leap years between 2019/2020", () => {
    const result = leaps(2019, 2020);
    expect(result).toBe(0);
  });

  it("correctly finds 0 leap years between 1900/1901", () => {
    const result = leaps(1900, 1901);
    expect(result).toBe(0);
  });

  it("correctly finds 1 leap year between 2000/2001", () => {
    const result = leaps(2000, 2001);
    expect(result).toBe(1);
  });

  it("correctly finds 0 leap years between 2800/2810", () => {
    const result = leaps(2800, 2801);
    expect(result).toBe(0);
  });

  it("correctly finds 0 leap years between 123456/123456", () => {
    const result = leaps(123456, 123456);
    expect(result).toBe(0);
  });

  it("correctly finds leap years in a large date range", () => {
    const result = leaps(1234, 5678);
    expect(result).toBe(1077);
  });

  it("correctly finds leap years in a larger date range", () => {
    const result = leaps(123456, 7891011);
    expect(result).toBe(1881475);
  });

  it("efficiently finds leap years in extremely large numbers", () => {
    const result = leaps(123456789101112, 1314151617181920);
    expect(result).toBe(288412747246240);
  });
});
