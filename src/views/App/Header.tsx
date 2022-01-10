import { Link } from "react-router-dom"
import { useSettings } from "../../store/Settings"

export const Header = () => {
  const { isPrivacyMode, setIsPrivacyMode } = useSettings();

  return (
    <>
      <button onClick={() => setIsPrivacyMode(!isPrivacyMode)}>{isPrivacyMode ? 'show' : 'hide'} balances</button>
      <div className="header-links">
        <Link to="/">Home</Link>
        {/* <Link to="wallets">Wallets</Link>
        <Link to="accounts">Accounts</Link> */}
        <Link to="assets">Assets</Link>
        <Link to="settings">Settings</Link>
      </div>
    </>
  )
}
