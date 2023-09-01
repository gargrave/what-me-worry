export type PricingRules = {
  [key: string]: {
    [key: number]: number;
  };
};

export const defaultPricingRules: PricingRules = {
  A: {
    1: 50,
    3: 130,
  },
  B: {
    1: 30,
    2: 45,
  },
  C: { 1: 20 },
  D: { 1: 15 },
};
