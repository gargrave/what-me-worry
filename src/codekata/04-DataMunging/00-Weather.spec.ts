import { run } from './00-Weather'

const EXPECTED_RESULT = { day: '14' }

describe('Weather', () => {
  it('parses the correct result', async () => {
    const result = await run()
    expect(result).toEqual(EXPECTED_RESULT)
  })
})
