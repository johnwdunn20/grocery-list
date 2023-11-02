import React, { useEffect, useState } from "react";

// Components
import Header from './Header';
import NewItem from './NewItem';
import ShoppingListContainer from './ShoppingListContainer'
import SideBar from "./SideBar";
import Profile from "./Profile";

const App = () => {

  const [groceries, setGroceries] = useState([])
  const [newItemToggle, setNewItemToggle] = useState(false);
  const [sideBarClass, setSideBarClass] = useState('sidebar-closed');
  const [profileClass, setProfileClass] = useState('profile-closed');

  // get initial data on page load
  useEffect(() => {
    fetch('/api/groceries')
      .then(response => response.json())
      .then(data => {
        console.log('Data is below:');
        setGroceries(data);
      })
      .catch(err => console.log(err));

  }, [setNewItemToggle]);

  // Ability to save new item
  const saveNewItem = (e) => {
    e.preventDefault();
    const inputElem = e.target.querySelector('#new-item-input');
    const newItem = inputElem.value;
    inputElem.value =  '';
    fetch('/api/addItem', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({newItem})
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data) setNewItemToggle(!newItemToggle);
      })
      .catch(err => console.log(err));
  }

  // Open the sidebar. *** Probably easier with booleans and ternary operators
  const showSideBar = () => {
    setSideBarClass('sidebar-open');
  }
  // Close the sidebar
  const closeSideBar = () => {
    setSideBarClass('sidebar-closed');
  }

  // Open the profile
  const showProfile = () => {
    setProfileClass('profile-open');
  }
  // Close the profile
  const closeProfile= () => {
    setProfileClass('profile-closed');
  }

  return (
    <>
      <SideBar sideBarClass={sideBarClass} closeSideBar={closeSideBar}/>
      <Profile profileClass={profileClass} closeProfile ={closeProfile}/>
      <Header showSideBar={showSideBar} showProfile={showProfile}/>
      
      <main>
        <NewItem saveNewItem={saveNewItem}/>
        <ShoppingListContainer groceries={groceries}/>
      </main>
    </>
  );
};

export default App;