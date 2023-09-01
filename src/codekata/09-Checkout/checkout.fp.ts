import { PricingRules } from "./rules";

export type CartType = string[];
export type CartMapType = { [key: string]: number };

export const Cart = {
  add: (previousCart: CartType = [], item: string = ""): CartType =>
    item ? previousCart.concat(item) : previousCart,
};

export const Checkout = {
  total: (cart, pricingRules: PricingRules): number => {
    let totalPrice = 0;

    const cartMap: CartMapType = cart.reduce((acc, item) => {
      const itemCount = acc[item] ? acc[item] + 1 : 1;
      return {
        ...acc,
        [item]: itemCount,
      };
    }, {} as CartMapType);

    Object.keys(cartMap).forEach((item) => {
      const ruleset = pricingRules[item];
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
  },
};
