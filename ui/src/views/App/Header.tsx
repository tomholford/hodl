import React from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useSettings } from "../../store/Settings"
import './Header.scss';

export const Header = () => {
  const { isDarkMode, isPrivacyMode, setIsPrivacyMode, toggleDarkMode } = useSettings();
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-top">
        <div className="header-logo">
          <Link to={'/'}><code>%hodl</code></Link>
          <Link to={'/about'}>about</Link>
        </div>
        <div className="header-toggles">
          <button title={`${isPrivacyMode ? 'show' : 'hide'} balances`} onClick={() => setIsPrivacyMode(!isPrivacyMode)}>{isPrivacyMode ? '👁️' : '🤫'}</button>
          <button title={`${isDarkMode ? 'disable' : 'enable'} dark theme`} onClick={() => toggleDarkMode()}>{isDarkMode ? '☀️' : '🌙'}</button>
          <button title={'settings'} onClick={() => navigate('/settings')}>{'⚙️'}</button>
        </div>
      </div>
    </div>
  )
}
