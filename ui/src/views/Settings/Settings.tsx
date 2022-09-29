import React from 'react';
import { Link } from "react-router-dom";
import SettingsForm from "./SettingsForm";

export const Settings = () => {
  return (<>
    <h2>Settings</h2>
    <p><Link to={'/'}>back</Link></p>
    <SettingsForm />
  </>)
}
