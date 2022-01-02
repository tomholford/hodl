import BN from "bn.js";
import { Currency } from "./Currency.type";
import Wallet from "./Wallet.type";

interface Account {
  address?: string;
  currency?: Currency;
  balance?: BN;
  // wallet?: Wallet;
  uuid?: string;
}

export default Account;

// interface CustodialAccount extends Account {
//   custodian?: string;
// }

// interface NoncustodialAccount extends Account {
//   address?: string;
// }
