import React from "react";
// Static files
import hamburger from '../images/hamburger.png'
import profile from '../images/profile.png'

const Header = () => {
  return (
    <header className="header">
      <img id="hamburger" src={hamburger} alt="hamburger" />
      <h1>Shoppping List</h1>
      <img id="profile" src={profile} alt="Profile" />
    </header>
  );
}

export default Header;