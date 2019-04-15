/*
Take the two programs written previously and factor out as much common 
code as possible, leaving you with two smaller programs and some kind 
of shared functionality.
*/
const defaultLineMatcher = (ln: string) => !!ln.match(/[A-z0-9]/)

export const parseLine = (
  line: string,
  matcher: (line: string) => boolean = defaultLineMatcher,
) => line.split(' ').filter(matcher)

export const findMinSpread = (
  data: any[],
  hiValKey: number,
  loValKey: number,
) =>
  data.reduce((accum, val) => {
    const hiVal = val[hiValKey]
    const loVal = val[loValKey]
    const diff = Math.abs(hiVal - loVal)

    if (!accum || diff < accum.diff) {
      return { ...val, diff }
    }
    return accum
  }, null)
