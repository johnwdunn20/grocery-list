import React, { useState } from 'react'
import SideBar from "../components/SideBar";
import Header from '../components/Header';
import Profile from "../components/Profile";

const FullNavBar = () => {
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

  return (
    <div className="w-full lg:w-3/4 xl:w-2/3 mx-auto">
      <SideBar sideBarOpen={sideBarOpen} closeSideBar={closeSideBar} />
      <Profile profileOpen={profileOpen} closeProfile={closeProfile} />
      <Header showSideBar={showSideBar} showProfile={showProfile} />
  </div>
  )
}

export default FullNavBar