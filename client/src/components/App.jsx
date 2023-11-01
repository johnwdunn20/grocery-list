import React from "react";

// Components
import Header from './Header';
import NewItem from './NewItem';
import ShoppingListContainer from './ShoppingListContainer'



const App = () => {
  return (
    <>
      <Header/>

      <main>
        <NewItem/>
        <ShoppingListContainer/>
      </main>
    </>
  );
};

export default App;