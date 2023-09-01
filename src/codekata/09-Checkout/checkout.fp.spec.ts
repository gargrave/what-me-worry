import { Cart, Checkout } from "./checkout.fp";
import { defaultPricingRules } from "./rules";

const price = (goods: string) => {
  const cart = goods.split("").reduce((acc, item) => Cart.add(acc, item), []);
  return Checkout.total(cart, defaultPricingRules);
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
    let cart = [];
    expect(Checkout.total(cart, defaultPricingRules)).toBe(0);

    cart = Cart.add(cart, "A");
    expect(Checkout.total(cart, defaultPricingRules)).toBe(50);

    cart = Cart.add(cart, "B");
    expect(Checkout.total(cart, defaultPricingRules)).toBe(80);

    cart = Cart.add(cart, "A");
    expect(Checkout.total(cart, defaultPricingRules)).toBe(130);

    cart = Cart.add(cart, "A");
    expect(Checkout.total(cart, defaultPricingRules)).toBe(160);

    cart = Cart.add(cart, "B");
    expect(Checkout.total(cart, defaultPricingRules)).toBe(175);
  });
});
