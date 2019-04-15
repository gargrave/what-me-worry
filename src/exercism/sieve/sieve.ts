type PrimeMap = {
  [key: number]: boolean
}

const getValues = (max: number) =>
  Array(max)
    .fill(0)
    .map((_, i) => i + 1)

// Checks whether a given value should be run through the sieve
// - Even numbers never need to be processed
// - Number that are already found to be non-prime can be skipped
//    - e.g. If we have already processed 4, all factors of 8 have inherently already been found,
//            so we know we can safely skip processing 8
const shouldProcessValue = (val: number, foundNonPrimes: PrimeMap): boolean =>
  val % 2 !== 0 && !(val in foundNonPrimes)

const find = (max: number): number[] => {
  const foundNonPrimes: PrimeMap = { 0: true, 1: true }
  const values = getValues(max)

  values.forEach(val => {
    if (shouldProcessValue(val, foundNonPrimes)) {
      for (let i = val * 2; i < max; i += val) {
        foundNonPrimes[i] = true
      }
    }
  })

  return values.filter(val => {
    if (val === 2) {
      return true
    }
    if (val % 2 === 0) {
      return false
    }
    return !(val in foundNonPrimes)
  })
}

export const Primes = {
  find,
}
