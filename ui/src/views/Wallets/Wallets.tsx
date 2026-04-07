import { useWallets, useWalletsInitialized } from "../../state/wallets";
import { useWalletsState } from "../../state/wallets";
import WalletForm from "./WalletForm";
import { useCallback } from "react";

const Wallets = () => {
  const wallets = useWallets();
  const initialized = useWalletsInitialized();

  const handleDelete = useCallback(async (id: string) => {
    await useWalletsState.getState().del(id);
  }, []);

  if (!initialized) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>wallets</h1>
      <hr />
      {wallets.length > 0
        ? wallets.map(w => (
            <div key={w.id}>
              <strong>{w.name}</strong> {w.note && <span>— {w.note}</span>}
              <button onClick={() => handleDelete(w.id)} title="delete">💣</button>
            </div>
          ))
        : <p>No wallets</p>
      }
      <hr />
      <WalletForm />
    </>
  );
}

export default Wallets;
