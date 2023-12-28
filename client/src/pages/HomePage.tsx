import React, { useEffect, useState } from "react";

// Components
import Header from '../components/Header';
import NewItem from '../components/NewItem';
import ShoppingListContainer from '../components/ShoppingListContainer'
import SideBar from "../components/SideBar";
import Profile from "../components/Profile";

const HomePage = () => {

  const [groceries, setGroceries] = useState([])

  const [lastCategory, setLastCategory] = useState<string>('');
  const [newItem, setNewItem] = useState<string>('');
  
  const [newItemToggle, setNewItemToggle] = useState<boolean>(false);
  
  // toggle side bar and profile
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

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
    setNewItem(newItem);
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
        // set last category
        setLastCategory(data);
        console.log('New category: ', data);
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
    // console.log(id);
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
    <>
      <div className="bg-secondaryBackgroud sticky top-0 z-50">
        <SideBar sideBarOpen={sideBarOpen} closeSideBar={closeSideBar} />
        <Profile profileOpen={profileOpen} closeProfile={closeProfile} />
        <Header showSideBar={showSideBar} showProfile={showProfile} />
      </div>

      <main>
        <NewItem saveNewItem={saveNewItem} lastCategory={lastCategory} newItem={newItem} setNewItem={setNewItem} />
        <ShoppingListContainer groceries={groceries} deleteItem={deleteItem} toggleCheck={toggleCheck}/>
      </main>
    </>
  );


}

export default HomePage