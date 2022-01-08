import { CURRENCIES } from "../constants";
import { Currency } from "../types/Currency.type";

export const currencyToCoinId = (currency: string) => {
  return CURRENCIES[currency as Currency].id;
}
