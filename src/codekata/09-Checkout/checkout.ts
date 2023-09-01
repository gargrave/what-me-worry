import { PricingRules } from "./rules";

export class Checkout {
  rules: PricingRules;
  cart: string[];

  constructor(pricingRules: PricingRules) {
    this.rules = pricingRules;
    this.cart = [];
  }

  scan(item: string): void {
    this.cart.push(item);
  }

  get total(): number {
    let totalPrice = 0;

    const cartMap = this.cart.reduce((acc, item) => {
      const itemCount = acc[item] ? acc[item] + 1 : 1;
      return {
        ...acc,
        [item]: itemCount,
      };
    }, {});

    Object.keys(cartMap).forEach((item) => {
      const ruleset = this.rules[item];
      const rulesetKeys = Object.keys(ruleset);
      const itemQty = cartMap[item];

      if (rulesetKeys.length === 1) {
        totalPrice += itemQty * ruleset[rulesetKeys[0]];
      } else {
        const sortedKeys = rulesetKeys.sort().reverse();
        let remainingItemQty = itemQty;

        sortedKeys.forEach((ruleKey) => {
          const key = parseInt(ruleKey);
          while (remainingItemQty >= key) {
            totalPrice += ruleset[ruleKey];
            remainingItemQty -= key;
          }
        });
      }
    });

    return totalPrice;
  }
}
