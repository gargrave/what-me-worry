const parse = (value: string) =>
  value
    .split('')
    .reverse()
    .filter(val => val !== ' ')
    .reduce((accum, val, idx) => {
      if (idx % 2 === 0) {
        return accum + parseInt(val, 10)
      }

      const dbl = parseInt(val, 10) * 2
      return accum + (dbl > 9 ? dbl - 9 : dbl)
    }, 0)

export const isValidLuhn = (value: string) => {
  const trimmed = value.trim()
  if (trimmed.match(/[^0-9\s]/)) {
    return false
  }

  if (trimmed.length < 2) {
    return false
  }

  return parse(trimmed) % 10 === 0
}
