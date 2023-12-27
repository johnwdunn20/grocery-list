import React from "react";
// Static files
import hamburger from '../images/hamburger.png'
import profile from '../images/profile.png'

const Header = ({showSideBar, showProfile}) => {
  return (
    <header className="header">
      <img id="hamburger" src={hamburger} alt="hamburger" onClick={showSideBar} />
      <h1>Shoppping List</h1>
      <img id="profile" src={profile} alt="Profile" onClick={showProfile}/>
    </header>
  );
}

export default Header;