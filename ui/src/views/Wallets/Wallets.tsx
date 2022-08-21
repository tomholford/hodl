import { useWallets } from "../../store/Wallets";
import WalletForm from "./WalletForm";

const Wallets = () => {
  const { wallets } = useWallets();

  return (
    <>
      <h1>wallets</h1>
      <hr />
      {
        wallets ?
          wallets.map(w => <p>{w.uuid}</p>)
          : 'No wallets'
      }
      <hr />
      <WalletForm />
    </>
  );
}

export default Wallets;
