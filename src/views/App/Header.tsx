import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <>
      <div className="header-links">
        <Link to="/">Home</Link>
        {/* <Link to="wallets">Wallets</Link>
        <Link to="accounts">Accounts</Link> */}
        <Link to="assets">Assets</Link>
      </div>
    </>
  )
}
