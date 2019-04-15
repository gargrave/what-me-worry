const assert = require('assert')

const { Checkout } = require('./checkout')
const { defaultPricingRules } = require('./rules')

const price = goods => {
  const co = new Checkout(defaultPricingRules)
  goods.split('').forEach(item => co.scan(item))
  return co.total
}

describe('FP Checkout', () => {
  it('totals the cart correctly', () => {
    expect(price('')).toBe(0)
    expect(price('A')).toBe(50)
    expect(price('AB')).toBe(80)
    expect(price('CDBA')).toBe(115)

    expect(price('AA')).toBe(100)
    expect(price('AAA')).toBe(130)
    expect(price('AAAA')).toBe(180)
    expect(price('AAAAA')).toBe(230)
    expect(price('AAAAAA')).toBe(260)

    expect(price('AAAB')).toBe(160)
    expect(price('AAABB')).toBe(175)
    expect(price('AAABBD')).toBe(190)
    expect(price('DABABA')).toBe(190)
  })

  it('processes incremental inclusions correctly', () => {
    const co = new Checkout(defaultPricingRules)
    assert.equal(0, co.total)

    co.scan('A')
    assert.equal(50, co.total)

    co.scan('B')
    assert.equal(80, co.total)

    co.scan('A')
    assert.equal(130, co.total)

    co.scan('A')
    assert.equal(160, co.total)

    co.scan('B')
    assert.equal(175, co.total)
  })
})
