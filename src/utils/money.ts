import Decimal from "decimal.js";

Decimal.set({ precision: 40, rounding: Decimal.ROUND_HALF_UP });

export function D(x: string | number) {
  return new Decimal(x);
}
