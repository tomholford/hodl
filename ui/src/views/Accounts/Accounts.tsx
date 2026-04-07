import { useAccounts, useAccountsInitialized } from "../../state/accounts";
import { AccountRow } from "./AccountRow";
import AccountsForm from "./AccountsForm";

const Accounts = () => {
  const accounts = useAccounts();
  const initialized = useAccountsInitialized();

  if (!initialized) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>accounts</h1>
      <hr />
      <AccountsForm />
      <hr />
      {accounts.length > 0
        ? accounts.map(a => <AccountRow account={a} key={a.id} />)
        : <p>No accounts</p>
      }
    </>
  );
}

export default Accounts;
