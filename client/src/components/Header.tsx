import React from "react";
// Static files
import hamburger from '../images/hamburger.png'
import profile from '../images/profile.png'

const Header = ({showSideBar, showProfile}) => {
  return (
    <header className="flex items-center justify-between max-h-100 mt-0 text-blue-700">
      <img id="hamburger" src={hamburger} alt="hamburger" onClick={showSideBar} className="max-h-10 w-auto ml-1" />
      <h1 className="text-primaryBlue text-3xl font-semibold">Shopping List</h1>
      <img id="profile" src={profile} alt="Profile" onClick={showProfile} className="max-h-10 w-auto mr-1"/>
    </header>
  );
}

export default Header;