import Point, { IPoint } from './point'

export type BoardState = {
  black: IPoint
  white: IPoint
}

export default class QueenAttack {
  black: IPoint
  white: IPoint

  constructor(boardState: BoardState) {
    const { black, white } = boardState

    if (Point.areEqual(black, white)) {
      throw Error('Queens cannot share the same space')
    }

    this.black = black
    this.white = white
  }

  canAttack(): boolean {
    if (Point.sameRow(this.black, this.white)) {
      return true
    }
    if (Point.sameCol(this.black, this.white)) {
      return true
    }
    if (Point.diagonalFrom(this.black, this.white)) {
      return true
    }
    return false
  }

  toString(): string {
    let board = []
    for (let x = 0; x < 8; x += 1) {
      let row = []
      for (let y = 0; y < 8; y += 1) {
        if (Point.areEqual(this.white, [x, y])) {
          row.push('W')
        } else if (Point.areEqual(this.black, [x, y])) {
          row.push('B')
        } else {
          row.push('_')
        }
      }
      board.push(row.join(' '))
    }
    return board.join('\n')
  }
}
