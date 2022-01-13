import { NavLink } from "react-router-dom"
import { useSettings } from "../../store/Settings"
import './Header.scss';

export const Header = () => {
  const { isDarkMode, isPrivacyMode, setIsPrivacyMode, toggleDarkMode } = useSettings();

  return (
    <div className="header">
      <div className="header-top">
        <div className="header-logo"><code>%hodl</code></div>
        <div className="header-toggles">
          <button title={`${isPrivacyMode ? 'show' : 'hide'} balances`} onClick={() => setIsPrivacyMode(!isPrivacyMode)}>{isPrivacyMode ? '👁️' : '🤫'}</button>
          <button title={`${isDarkMode ? 'disable' : 'enable'} dark theme`} onClick={() => toggleDarkMode()}>{isDarkMode ? '☀️' : '🌙'}</button>
        </div>
      </div>
      <div className="header-links">
        {/* <Link to="/">Home</Link> */}
        {/* <Link to="wallets">Wallets</Link>
        <Link to="accounts">Accounts</Link> */}
        <NavLink to="assets">Assets</NavLink>
        <NavLink to="settings">Settings</NavLink>
      </div>
    </div>
  )
}
