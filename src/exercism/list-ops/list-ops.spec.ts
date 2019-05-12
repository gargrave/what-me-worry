import List from './list-ops'

describe('List Ops', () => {
  describe('length()', () => {
    it('returns 0 for an empty list', () => {
      const list1 = new List<number>()
      expect(list1.length()).toEqual(0)
    })

    it('corretly returns the length of a non-zero length list', () => {
      const list1 = new List<number>([1, 2, 3, 4])
      expect(list1.length()).toEqual(4)
    })
  })

  describe('append()', () => {
    it('safely appends two empty lists', () => {
      const list1 = new List<number>()
      const list2 = new List<number>()
      expect(list1.append(list2)).toEqual(new List())
    })

    it('safely appends an empty list to a non-empty list', () => {
      const list1 = new List<number>([1, 2, 3, 4])
      const list2 = new List<number>()
      expect(list1.append(list2)).toEqual(list1)
    })

    it('non-empty lists', () => {
      const list1 = new List<number>([1, 2])
      const list2 = new List<number>([2, 3, 4, 5])
      expect(list1.append(list2).values).toEqual([1, 2, 2, 3, 4, 5])
    })
  })

  describe('concat()', () => {
    it('safely concats an empty list', () => {
      const list1 = new List<number>()
      const list2 = new List<number>([])
      expect(list1.concat(list2).values).toEqual([])
    })

    it('correclty concats a list of lists', () => {
      const list1 = new List<number>([1, 2])
      const list2 = new List<number>([3])
      const list3 = new List<number>([])
      const list4 = new List<number>([4, 5, 6])
      const listOfLists = [list2, list3, list4]
      expect(list1.concat(listOfLists).values).toEqual([1, 2, 3, 4, 5, 6])
    })
  })

  describe('filter()', () => {
    const filterFn = (el: number) => el % 2 === 1

    it('handles an empty list', () => {
      const list1 = new List([])
      expect(list1.filter(filterFn).values).toEqual([])
    })

    it('handles a non-empty list', () => {
      const list1 = new List([1, 2, 3, 5])
      expect(list1.filter(filterFn).values).toEqual([1, 3, 5])
    })
  })

  describe('map()', () => {
    const mapFn = (el: number) => el + 1

    it('handles an empty list', () => {
      const list1 = new List()
      expect(list1.map(mapFn).values).toEqual([])
    })

    it('handles a non-empty list', () => {
      const list1 = new List([1, 3, 5, 7])
      expect(list1.map(mapFn).values).toEqual([2, 4, 6, 8])
    })
  })

  describe('reverse()', () => {
    // reverse the elements of a list
    it('handles an empty list', () => {
      const list1 = new List<number>()
      expect(list1.reverse().values).toEqual([])
    })

    it('does nothing to a single-element list', () => {
      const list = new List<number>([42])
      const result = list.reverse()
      expect(result.values).toEqual([42])
    })

    it('correctly reverse a non-empty list', () => {
      const list1 = new List([1, 3, 5, 7])
      expect(list1.reverse().values).toEqual([7, 5, 3, 1])
    })
  })

  describe('foldl', () => {
    const foldFn = (acc: number, el: number) => el / acc
    // folds (reduces) the given list from the left with a function

    it('handles an empty list', () => {
      const list1 = new List<number>()
      expect(list1.foldl(foldFn, 2)).toEqual(2)
    })

    it('correctly folds from left to right', () => {
      const list1 = new List([1, 2, 3, 4])
      expect(list1.foldl(foldFn, 24)).toEqual(64)
    })
  })

  describe('foldr', () => {
    const foldFn = (acc: number, el: number) => el / acc

    // folds (reduces) the given list from the right with a function
    it('handles an empty list', () => {
      const list1 = new List()
      expect(list1.foldr(foldFn, 2)).toEqual(2)
    })

    it('correctly folds from right to left', () => {
      const list1 = new List([1, 2, 3, 4])
      expect(list1.foldr(foldFn, 24)).toEqual(9)
    })
  })
})
