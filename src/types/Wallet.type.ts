// A Wallet can be used to automatically import Accounts; they are optional to import / create

interface Wallet {
  uuid?: string;
  mnemonic?: string;
  passphrase?: string;
}

export default Wallet;
