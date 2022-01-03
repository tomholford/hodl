import BN from "bn.js"

export const balanceWithDecimal = (balance: BN, denominator: number = 100) => {
  // return balance.divn(denominator).toString(10);
  return balance.toString(10);
}

export const abbreviatedAddress = (address: string) => {
  return address.slice(0,6) + '...' + address.slice(-7);
}