import {
  Frame,
  frameBaseScore,
  rollsToFrames,
  validateFrames,
} from "./frames.utils";

export default class Bowling {
  frames: Frame[];

  constructor(rolls: number[]) {
    this.frames = rollsToFrames(rolls);
    validateFrames(this.frames);
  }

  score(): number {
    const frames = this.frames;

    return frames.reduce((acc, frame, i): number => {
      if (frame.isBonus) {
        return acc;
      }

      let frameScore = frameBaseScore(frame);
      const oneFrameOut = frames[i + 1];
      const twoFramesOut = frames[i + 2];

      if (frame.isSpare) {
        const bonusRoll1 = (oneFrameOut && oneFrameOut.roll1) || 0;
        frameScore += bonusRoll1;
      } else if (frame.isStrike) {
        const bonusRoll1 = (oneFrameOut && oneFrameOut.roll1) || 0;
        const bonusRoll2 =
          (oneFrameOut && oneFrameOut.roll2) ||
          (twoFramesOut && twoFramesOut.roll1) ||
          0;
        frameScore += bonusRoll1 + bonusRoll2;
      }

      return acc + frameScore;
    }, 0);
  }
}
