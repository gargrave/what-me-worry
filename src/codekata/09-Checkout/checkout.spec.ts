import { Checkout } from "./checkout";
import { defaultPricingRules } from "./rules";

const price = (goods: string) => {
  const co = new Checkout(defaultPricingRules);
  goods.split("").forEach((item) => co.scan(item));
  return co.total;
};

describe.skip("FP Checkout", () => {
  it("totals the cart correctly", () => {
    expect(price("")).toBe(0);
    expect(price("A")).toBe(50);
    expect(price("AB")).toBe(80);
    expect(price("CDBA")).toBe(115);

    expect(price("AA")).toBe(100);
    expect(price("AAA")).toBe(130);
    expect(price("AAAA")).toBe(180);
    expect(price("AAAAA")).toBe(230);
    expect(price("AAAAAA")).toBe(260);

    expect(price("AAAB")).toBe(160);
    expect(price("AAABB")).toBe(175);
    expect(price("AAABBD")).toBe(190);
    expect(price("DABABA")).toBe(190);
  });

  it("processes incremental inclusions correctly", () => {
    const co = new Checkout(defaultPricingRules);
    expect(co.total).toBe(0);

    co.scan("A");
    expect(co.total).toBe(50);

    co.scan("B");
    expect(co.total).toBe(80);

    co.scan("A");
    expect(co.total).toBe(130);

    co.scan("A");
    expect(co.total).toBe(160);

    co.scan("B");
    expect(co.total).toBe(175);
  });
});
