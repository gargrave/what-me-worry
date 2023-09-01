import { run } from "./Anagrams";

const EXPECTED_RESULT = { sets: 20683, words: 48162 };

let cLog;
let cTime;
let cTimeEnd;

describe("Anagrams", () => {
  beforeAll(() => {
    cLog = console.log;
    cTime = console.time;
    cTimeEnd = console.timeEnd;
    console.log = () => void 0;
    console.time = () => void 0;
    console.timeEnd = () => void 0;
  });

  afterAll(() => {
    console.log = cLog;
    console.time = cTime;
    console.timeEnd = cTimeEnd;
  });

  it("parses the data correctly", async () => {
    const result = await run();
    expect(result).toEqual(EXPECTED_RESULT);
  });
});
