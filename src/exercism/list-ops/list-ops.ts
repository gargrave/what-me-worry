export default class List<T> {
  values: T[]

  constructor(values?: T[]) {
    this.values = values || []
  }

  length(): number {
    return (this.values && this.values.length) || 0
  }

  append(other: List<T>): List<T> {
    const prevLen = this.length()
    const newLen = prevLen + other.length()
    const newValues = Array(newLen)

    for (let i = 0; i < newLen; i += 1) {
      if (i < prevLen) {
        newValues[i] = this.values[i]
      } else {
        newValues[i] = other.values[i - prevLen]
      }
    }

    this.values = newValues
    return this
  }

  concat(other: List<T> | List<T>[]): List<T> {
    if (Array.isArray(other)) {
      other.forEach(list => this.append(list))
    } else {
      this.append(other)
    }
    return this
  }

  filter(fn: (el: T) => boolean): List<T> {
    const len = this.values.length
    const newValues = []
    for (let i = 0; i < len; i += 1) {
      const value = this.values[i]
      if (fn(value)) {
        newValues.push(value)
      }
    }
    this.values = newValues
    return this
  }

  map(fn: (el: T) => T): List<T> {
    const len = this.values.length
    const newValues = Array(len)
    for (let i = 0; i < len; i += 1) {
      newValues[i] = fn(this.values[i])
    }
    this.values = newValues
    return this
  }

  reverse(): List<T> {
    const len = this.values.length
    if (len <= 1) {
      return this
    }

    const newValues = Array(len)
    for (let i = 0; i < len; i += 1) {
      newValues[i] = this.values[len - 1 - i]
    }
    this.values = newValues
    return this
  }

  foldl<FoldType>(
    fn: (acc: FoldType, el: T) => FoldType,
    initialValue: FoldType,
  ): FoldType {
    const len = this.values.length
    let value = initialValue
    for (let i = 0; i < len; i += 1) {
      value = fn(value, this.values[i])
    }
    return value
  }

  foldr<FoldType>(
    fn: (acc: FoldType, el: T) => FoldType,
    initialValue: FoldType,
  ): FoldType {
    return this.reverse().foldl<FoldType>(fn, initialValue)
  }
}
