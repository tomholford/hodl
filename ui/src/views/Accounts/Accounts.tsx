import { useAccounts } from "../../store/Accounts";
import { AccountRow } from "./AccountRow";
import AccountsForm from "./AccountsForm";

const Accounts = () => {
  const { accounts } = useAccounts();

  return (
    <>
      <h1>accounts</h1>
      <hr />
      <AccountsForm />
      <hr />
      {
        accounts ?
          accounts.map(a => <AccountRow account={a} key={a.uuid} />)
          : 'No accounts'
      }
    </>
  );
}

export default Accounts;
