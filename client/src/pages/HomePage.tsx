import React, { useEffect, useState } from "react";

// Components
import Header from '../components/Header';
import NewItem from '../components/NewItem';
import ShoppingListContainer from '../components/ShoppingListContainer'
import SideBar from "../components/SideBar";
import Profile from "../components/Profile";
import { set } from "react-hook-form";
import FullNavBar from "../components/FullNavBar";
import { Link } from "react-router-dom";

const HomePage = () => {

  const [groceries, setGroceries] = useState([])

  const [lastCategory, setLastCategory] = useState<string>('');
  const [newItem, setNewItem] = useState<string>('');
  const [showingPurchasedItems, setShowingPurchasedItems] = useState<boolean>(true);
  const [newItemToggle, setNewItemToggle] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  console.log('isLoggedin: ', isLoggedIn);

  // check if user is logged in
  const checkIfLoggedIn = async () => {
    try {
      const response = await fetch(`${process.env.API_URL || ''}/api/isLoggedIn`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      // response is ok when user is logged in
      if (response.ok) {
        setIsLoggedIn(true);
        const data = await response.json();
        setUsername(data);
        console.log(data);
        console.log('isLoggedin: ', isLoggedIn);
      }
    } catch (err) {
      console.log(err);
    }
  }
  // check if logged in on page load
  checkIfLoggedIn();


  // get initial data on page load
  const getGroceries = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/api/groceries`);
      
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
    // console.log('Saving new item');
    e.preventDefault();
    const inputElem = e.target.querySelector('#new-item-input');
    const newItem = inputElem.value;
    if (newItem === '') return;
    setNewItem(newItem);
    inputElem.value = '';
    // if user isn't logged in, just get the category to display it
    if (!isLoggedIn) {
      fetch(`${process.env.API_URL || ''}/api/category`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newItem })
      })
        .then(response => response.json())
        .then(data => {
          setLastCategory(data);
        })
        .catch(err => console.log(err));
    } else {
      // if user is logged in, add to the db
      fetch(`${process.env.API_URL || ''}/api/addItem`, {
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
          if (data) setNewItemToggle(!newItemToggle);
        })
        .catch(err => console.log(err));
    }
  }

  // Ability to check an item
  const toggleCheck = (id: string, categoryId: string, checked: boolean) => {
    // update groceries state
    const updatedGroceries = groceries.map(grocery => {
      if (grocery._id === categoryId) {
        const updatedItems = grocery.items.map(item => {
          if (item._id === id) {
            // console.log('Item to update: ', item);
            // console.log('Updated item: ', { ...item, checked });
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
    fetch(`${process.env.API_URL || ''}/api/toggleCheck/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, categoryId, checked })
    })
      .then(response => response.json())
      .then(data => {
        // console.log('Toggle updated: ', data);
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
    fetch(`${process.env.API_URL || ''}/api/deleteItem`, {
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

  const clearAll = async () => {
    // update state
    setGroceries([]);

    // update db
    try {
      const response = await fetch(`${process.env.API_URL || ''}/api/clearAll`, {
        method: 'POST'
      });
      if (response.ok) {
        setNewItemToggle(!newItemToggle);
      } else {
        console.log('Error clearing all items');
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const clearFound = async () => {
    // update state
    const updatedGroceries = groceries.map(grocery => {
      const updatedItems = grocery.items.filter(item => item.checked === false);
      return { ...grocery, items: updatedItems };
    });
    console.log('Updated groceries: ', updatedGroceries);
    setGroceries(updatedGroceries);
    // update db
    try {
      const response = await fetch(`${process.env.API_URL || ''}/api/clearFound`, {
        method: 'POST'
      });
      if (response.ok) {
        setNewItemToggle(!newItemToggle);
      } else {
        console.log('Error clearing all items');
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const showHidePurchasedItems = () => {
    // if currently hiding purchased items, show them by getting all items from db
    if (!showingPurchasedItems) {
      setNewItemToggle(!newItemToggle);
    } else {
      // if currently showing purchased items, hide them by filtering out checked items from state
      const updatedGroceries = groceries.map(grocery => {
        const updatedItems = grocery.items.filter(item => item.checked === false);
        return { ...grocery, items: updatedItems };
      });
      console.log('Updated groceries: ', updatedGroceries);
      setGroceries(updatedGroceries);
    }
    setShowingPurchasedItems(!showingPurchasedItems);
  }

  return (
    <>
      <FullNavBar isLoggedIn={isLoggedIn} username={username} />

      <main className=" w-full lg:w-3/4 xl:w-2/3 mx-auto ">
        <NewItem saveNewItem={saveNewItem} lastCategory={lastCategory} newItem={newItem} updateNewItem={updateNewItem} resetLastCategory={resetLastCategory} />
        {!isLoggedIn &&
          <section className="flex justify-center items-center">
              <Link className="text-2xl p-2 text-center text-zinc-100 bg-red-500 rounded-md sm:w-2/3 md:w-1/2 h-12 italic" to='/login'>Login to Save your List</Link> 
          </section>
        }
        <ShoppingListContainer groceries={groceries} deleteItem={deleteItem} toggleCheck={toggleCheck} clearAll={clearAll} clearFound={clearFound} showHidePurchasedItems={showHidePurchasedItems}/>
      </main>
    </>
  );


}

export default HomePage