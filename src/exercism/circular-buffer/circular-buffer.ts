const wrap = (val: number, max: number) => (val < max ? val : 0)

export class BufferOverflowError extends Error {}
export class BufferEmptyError extends Error {}

export default class CircularBuffer<T> {
  data: T[]
  readIdx: number
  writeIdx: number

  constructor(size: number) {
    this.clear(size)
  }

  clear(size?: number) {
    const bufferSize = size || this.data.length
    this.data = Array<T>(bufferSize).fill(undefined)
    this.readIdx = 0
    this.writeIdx = 0
  }

  read(): T {
    const idx = this.readIdx
    const value = this.data[idx]

    if (!value) {
      throw new BufferEmptyError()
    }

    this.data[idx] = undefined
    this.readIdx = wrap(idx + 1, this.data.length)
    return value
  }

  write(value: T) {
    const idx = this.writeIdx

    if (this.data[idx]) {
      throw new BufferOverflowError()
    }

    this.data[idx] = value
    this.writeIdx = wrap(idx + 1, this.data.length)
  }

  forceWrite(value: T) {
    // if the buffer is not empty, just do a regular write
    // otherwise, overwrite the oldest data
    if (!this.data[this.writeIdx]) {
      this.write(value)
    } else {
      const idx = this.readIdx
      this.data[idx] = value
      this.readIdx = wrap(idx + 1, this.data.length)
    }
  }
}
