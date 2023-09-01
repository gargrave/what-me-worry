import { run } from "./practical-num";

describe("Practical Numbers", () => {
  it("calculates the numbers correctly for 10 ** 4", () => {
    const result = run(10 ** 4);
    expect(result).toBe(6804107);
  });
});
