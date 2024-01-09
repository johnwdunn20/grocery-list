import React, { useEffect, useState } from "react";

// Components
import Header from '../components/Header';
import NewItem from '../components/NewItem';
import ShoppingListContainer from '../components/ShoppingListContainer'
import SideBar from "../components/SideBar";
import Profile from "../components/Profile";
import { set } from "react-hook-form";

const HomePage = () => {

  const [groceries, setGroceries] = useState([])

  const [lastCategory, setLastCategory] = useState<string>('');
  const [newItem, setNewItem] = useState<string>('');
  
  const [newItemToggle, setNewItemToggle] = useState<boolean>(false);
  
  // toggle side bar and profile
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  // get initial data on page load
  const getGroceries = async () => {
    try {
      const response = await fetch('/api/groceries');
      
      if (!response.ok) {
        return console.log('Error fetching groceries');
      };
      const data = await response.json();
      setGroceries(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getGroceries();
  }, [newItemToggle]);

  // functions to reset category set item
  const resetLastCategory = () => {
    setLastCategory('');
  }

  const updateNewItem = (item: string) => {
    setNewItem(item);
  }

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
  const toggleCheck = (id: string, categoryId: string, checked: boolean) => {
    // update groceries state
    const updatedGroceries = groceries.map(grocery => {
      if (grocery._id === categoryId) {
        const updatedItems = grocery.items.map(item => {
          if (item._id === id) {
            console.log('Item to update: ', item);
            console.log('Updated item: ', { ...item, checked });
            return { ...item, checked };
          } else {
            return item;
          }
        });
        return { ...grocery, items: updatedItems };
      } else {
        return grocery;
      }
    });
    setGroceries(updatedGroceries);

    // update in db
    fetch(`/api/toggleCheck/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, categoryId, checked })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Toggle updated: ', data);
        if (data) setNewItemToggle(!newItemToggle);
      })
      .catch(err => console.log(err))
  }

  // Delete an item
  const deleteItem = (id:string, categoryId: string) => {

    // immediately remove elem by updating state
    const updatedGroceries = groceries.map(grocery => {
      if (grocery._id === categoryId) {
        const updatedItems = grocery.items.filter(item => item._id !== id);
        return { ...grocery, items: updatedItems };
      } else {
        return grocery;
      }
    });
    // if no items left in category, remove category
    const updatedGroceries2 = updatedGroceries.filter(grocery => grocery.items.length > 0);

    setGroceries(updatedGroceries2);

    // update the database
    console.log('Sending request to delete: ', id);
    fetch(`/api/deleteItem`, {
      method: 'DELETE'
      , headers: { 'Content-Type': 'application/json' }
      , body: JSON.stringify({ id, categoryId })
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
      <div className="w-full lg:w-3/4 xl:w-2/3 mx-auto">
        <SideBar sideBarOpen={sideBarOpen} closeSideBar={closeSideBar} />
        <Profile profileOpen={profileOpen} closeProfile={closeProfile} />
        <Header showSideBar={showSideBar} showProfile={showProfile} />
      </div>

      <main className=" w-full lg:w-3/4 xl:w-2/3 mx-auto ">
        <NewItem saveNewItem={saveNewItem} lastCategory={lastCategory} newItem={newItem} updateNewItem={updateNewItem} resetLastCategory={resetLastCategory} />
        <ShoppingListContainer groceries={groceries} deleteItem={deleteItem} toggleCheck={toggleCheck}/>
      </main>
    </>
  );


}

export default HomePage