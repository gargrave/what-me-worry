export type Frame = {
  isBonus?: boolean
  isSpare?: boolean
  isStrike?: boolean
  roll1: number
  roll2?: number
}

/**
 * Converts a series of rolls into a series of borlwing frames.
 * This will always be at least 10 frames, with the potential for 1 or 2 bonus frames, depending on the score of frame #10.
 */
export const rollsToFrames = (rolls: number[]): Frame[] => {
  let isSecondRoll = false

  return rolls.reduce((acc, roll, i) => {
    // if we have 10 valid frames already, then this is a bonus roll
    if (acc.length >= 10) {
      return acc.concat({ isBonus: true, roll1: roll })
    }

    // if any regular frame is a 10, it should be handled as a strike
    if (roll === 10) {
      isSecondRoll = false
      return acc.concat({ isStrike: true, roll1: 10, roll2: null })
    }

    // "second roll" always closes a frame, and may or may not be a strike
    if (isSecondRoll) {
      isSecondRoll = false
      const prevRoll = rolls[i - 1]
      const total = roll + (rolls[i - 1] || 0)
      return acc.concat({
        isSpare: total === 10,
        roll1: prevRoll,
        roll2: roll,
      })
    }

    isSecondRoll = true
    return acc
  }, [])
}

/** Calculates the "base score" of a frame. This is ONLY the 1 or 2 rolls for the frame, with no strike/spare bonus added in. */
export const frameBaseScore = (frame: Frame): number =>
  frame.roll1 + (frame.roll2 || 0)

/** Validates that a given roll score is valid (i.e. between 0 1n 10) */
export const isValidRoll = (roll: number): boolean => roll >= 0 && roll <= 10

/** Checks all frames to ensure that all are actually possible. Any validation errors here will throw an error. */
export const validateFrames = (frames: Frame[]) => {
  if (frames.length < 10) {
    throw Error('Score cannot be taken until the end of the game')
  }

  const lastFrame = frames[9]
  const lastFrameScore = frameBaseScore(lastFrame)

  // cannot have extra frames without a strike/spare in the last frame
  if (frames.length > 10 && lastFrameScore !== 10) {
    throw Error('Should not be able to roll after game is over')
  }

  // last frame is a spare
  // a spare in the last frame requires 2 bonus frames
  if (lastFrame.roll1 === 10 && frames.length < 12) {
    throw Error('Score cannot be taken until the end of the game')
  }

  // last frame is a strike
  if (lastFrameScore === 10) {
    // a strike in the last frame requires 1 bonus frame
    if (frames.length < 11) {
      throw Error('Score cannot be taken until the end of the game')
    }
    // two bonus frames cannot score more than 10 points
    if (frames.length === 12) {
      const bonus1 = frames[10].roll1
      const totalBonus = bonus1 + frames[11].roll1
      if (bonus1 < 10 && totalBonus > 10) {
        throw Error('Pin count exceeds pins on the lane')
      }
    }
  }

  frames.forEach(f => {
    if (!isValidRoll(f.roll1) || !isValidRoll(f.roll2 || 0)) {
      throw Error('Pins must have a value from 0 to 10')
    }

    const total = f.roll1 + (f.roll2 || 0)
    if (total > 10) {
      throw Error('Pin count exceeds pins on the lane')
    }
  })
}
