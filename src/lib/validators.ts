import { Currency } from "../types/Currency.type";
// import { isValidAddress as isValidAvaxAddress } from "@avalabs/avalanche-wallet-sdk/dist/utils";

export const isValidAddress = (address: string, currency: Currency) => {
  switch (currency) {
    case 'AVAX':
      // return isValidAvaxAddress(address);  
      return /^([XPC]|[a-km-zA-HJ-NP-Z1-9]{36,72})-[a-zA-Z]{1,83}1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38}$/.test(address);
    default:
      return false
  }
}
