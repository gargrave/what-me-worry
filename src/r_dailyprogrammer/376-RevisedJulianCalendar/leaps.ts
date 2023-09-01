const LOOP_SIZE = 900;
const YEARS_PER_LOOP = 218;

const isLeapYear = (year) => {
  const rem = year % 900;
  if (rem === 200 || rem === 600) {
    return true;
  }

  if (year % 100 === 0) {
    return false;
  }

  return year % 4 === 0;
};

const reduceRange = (start, end) => {
  const range = end - start;
  let leapYearsFound = 0;
  let updatedYear = start + 1;

  if (range > LOOP_SIZE) {
    let loopCount = Math.floor(range / LOOP_SIZE);
    leapYearsFound = YEARS_PER_LOOP * loopCount;
    updatedYear = start + LOOP_SIZE * loopCount + 1;
  }

  return {
    leapYearsFound,
    updatedYear,
  };
};

export const leaps = (start: number, end: number) => {
  let year = start;
  let count = 0;

  while (year < end) {
    if (year % LOOP_SIZE === 200) {
      const { leapYearsFound, updatedYear } = reduceRange(year, end);
      count += leapYearsFound + 1;
      year = updatedYear;
    } else {
      if (isLeapYear(year)) {
        count += 1;
        year += 4;
      } else {
        year += 1;
      }
    }
  }

  return count;
};
