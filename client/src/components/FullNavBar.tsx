import React, { useState } from 'react'
import SideBar from "../components/SideBar";
import Header from '../components/Header';
import Profile from "../components/Profile";

type FullNavBarProps = {
  isLoggedIn?: boolean;
}

const FullNavBar:React.FC<FullNavBarProps> = ({ isLoggedIn }) => {
    // toggle side bar and profile
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
    const [profileOpen, setProfileOpen] = useState<boolean>(false);

    // Open the sidebars
    const showSideBar = () => {
      setSideBarOpen(true);
    }
    // Close the sidebar
    const closeSideBar = () => {
      setSideBarOpen(false);
    }
  
    // Open the profile
    const showProfile = () => {
      setProfileOpen(true);
    }
    // Close the profile
    const closeProfile = () => {
      setProfileOpen(false);
    }
  console.log('FullNavBar isLoggedIn: ', isLoggedIn);
  return (
    <div className="w-full lg:w-3/4 xl:w-2/3 mx-auto">
      <SideBar sideBarOpen={sideBarOpen} closeSideBar={closeSideBar} />
      <Profile profileOpen={profileOpen} closeProfile={closeProfile} isLoggedIn={isLoggedIn} />
      <Header showSideBar={showSideBar} showProfile={showProfile} />
  </div>
  )
}

export default FullNavBar