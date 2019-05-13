export type IPoint = [number, number]

const create = (x: number, y: number): IPoint => [x, y]

const sameRow = (a: IPoint, b: IPoint): boolean => a[0] === b[0]

const sameCol = (a: IPoint, b: IPoint): boolean => a[1] === b[1]

const diagonalFrom = (a: IPoint, b: IPoint): boolean => {
  const [xa, ya] = a
  const [xb, yb] = b
  return Math.abs(xa - xb) === Math.abs(ya - yb)
}

const areEqual = (a: IPoint, b: IPoint): boolean =>
  sameRow(a, b) && sameCol(a, b)

export default {
  areEqual,
  create,
  diagonalFrom,
  sameCol,
  sameRow,
}
