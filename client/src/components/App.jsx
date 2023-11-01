import React, { useEffect, useState } from "react";

// Components
import Header from './Header';
import NewItem from './NewItem';
import ShoppingListContainer from './ShoppingListContainer'

const App = () => {

  const [groceries, setGroceries] = useState([])

  // get initial data on page load
  useEffect(() => {
    fetch('/api/groceries')
      .then(response => response.json())
      .then(data => {
        console.log('Data is below:');
        console.log(data);
        setGroceries(data);
      })
      .catch(err => console.log(err));

  }, []);

  return (
    <>
      <Header/>

      <main>
        <NewItem/>
        <ShoppingListContainer groceries={groceries}/>
      </main>
    </>
  );
};

export default App;