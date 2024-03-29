/*
The file football.dat contains the results from the English Premier League for 2001/2. 
The columns labeled ‘F’ and ‘A’ contain the total number of goals scored for and against 
each team in that season (so Arsenal scored 79 goals against opponents, and had 36 goals scored against them). 
(http://codekata.com/data/04/football.dat)

Write a program to print the name of the team with the smallest difference in ‘for’ and ‘against’ goals.
*/
const fs = require("fs");
const path = require("path");
const readline = require("readline");

import { findMinSpread, parseLine } from "./helpers";

const FIRST_DATA_LINE = 1;
const FILE = path.join(__dirname, "./data/football.dat");
const KEYS = {
  TeamName: 1,
  PointsScored: 6,
  PointsAllowed: 7,
};

let linesParsed = 0;
let data = [];

export const run = async () =>
  new Promise((resolve) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(FILE),
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      if (linesParsed++ < FIRST_DATA_LINE) {
        return;
      }

      const parsed = parseLine(line);
      if (parsed.length) {
        data.push(parsed);
      }
    });

    rl.on("close", () => {
      const min = findMinSpread(data, KEYS.PointsScored, KEYS.PointsAllowed);
      const result = { team: min[KEYS.TeamName] };
      resolve(result);
    });
  });
