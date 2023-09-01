import { run } from "./01-Football";

const EXPECTED_RESULT = { team: "Aston_Villa" };

describe("Football", () => {
  it("parses the correct result", async () => {
    const result = await run();
    expect(result).toEqual(EXPECTED_RESULT);
  });
});
