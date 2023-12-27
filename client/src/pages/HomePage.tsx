import React, { useEffect, useState } from "react";

// Components
import Header from '../components/Header';
import NewItem from '../components/NewItem';
import ShoppingListContainer from '../components/ShoppingListContainer'
import SideBar from "../components/SideBar";
import Profile from "../components/Profile";

const HomePage = () => {

  const [groceries, setGroceries] = useState([])
  const [newItemToggle, setNewItemToggle] = useState(false);
  const [sideBarClass, setSideBarClass] = useState('sidebar-closed');
  const [profileClass, setProfileClass] = useState('profile-closed');

  // get initial data on page load
  useEffect(() => {
    fetch('/api/groceries')
      .then(response => response.json())
      .then(data => {
        setGroceries(data);
      })
      .catch(err => console.log(err));

  }, [newItemToggle]);

  // Ability to save new item
  const saveNewItem = (e) => {
    e.preventDefault();
    const inputElem = e.target.querySelector('#new-item-input');
    const newItem = inputElem.value;
    if (newItem === '') return;
    inputElem.value = '';
    fetch('/api/addItem', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newItem })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data) setNewItemToggle(!newItemToggle);
      })
      .catch(err => console.log(err));
  }

  // Ability to check an item
  const toggleCheck = (e) => {
    // should immediately check it in the UI, but checked is a state that's part of groceries so maybe has to go through that state?? And therefore easiest way is through db??
    // console.log(e.target.checked);
    // e.target.checked = !e.target.checked;

    const id = e.target.nextSibling.id 
    console.log(id);
    fetch(`/api/toggleCheck/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checked: e.target.checked }) // send the new checked value
    })
      .then(response => response.json())
      .then(data => {
        console.log('Toggle updated: ', data);
        if (data) setNewItemToggle(!newItemToggle);
      })
      .catch(err => console.log(err))

  }

  // Delete an item
  const deleteItem = (e) => {
    // probably an easier way to get the form id
    const id = e.target.parentElement.previousSibling.id;
    // immediately remove elem (if there's a db error, will reappear on page refresh)
    // need to refresh page in case you deleted an entire aisle

    // commenting this out as it *sometimes* errors
    // e.target.parentElement.parentElement.remove()
    console.log('Sending request to delete: ', id);
    fetch(`/api/deleteItem/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log('Deleted: ', data);
        if (data) setNewItemToggle(!newItemToggle);
      })
      .catch(err => console.log(err));
  };

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
  const closeProfile = () => {
    setProfileClass('profile-closed');
  }

  return (
    <>
      <div className="bg-secondaryBackgroud sticky top-0 z-50">
        <SideBar sideBarClass={sideBarClass} closeSideBar={closeSideBar} />
        <Profile profileClass={profileClass} closeProfile={closeProfile} />
        <Header showSideBar={showSideBar} showProfile={showProfile} />
      </div>

      <main>
        <NewItem saveNewItem={saveNewItem} />
        <ShoppingListContainer groceries={groceries} deleteItem={deleteItem} toggleCheck={toggleCheck}/>
      </main>
    </>
  );


}

export default HomePage