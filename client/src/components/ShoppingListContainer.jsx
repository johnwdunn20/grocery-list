import React, { useEffect, useState } from 'react'
import Aisle from './Aisle'

const ShoppingListContainer = ({groceries, deleteItem}) => {
  console.log('Groceries: ', groceries);

  const [aisleElems, setAisleElems] = useState([])

  useEffect(() => {
    setAisleElems(groceries.map(aisleNameAndItems => {
      console.log('useEffect in ShoppingListContainer');
      return (
        <Aisle
          aisleTitle={aisleNameAndItems.category}
          key={aisleNameAndItems.category}
          itemsArr={aisleNameAndItems.items}
          deleteItem={deleteItem}
        />
      );
    }))
  }, [groceries])

  return (
    <>
      <h2></h2>
      <section id="list-buttons">
          <input type="button" value="Clear Found Items"/>
          <input type="button" value="Clear All"/>
      </section>
      
      <section id="list-container">
        {aisleElems}
      </section>
    </>
  )
}

export default ShoppingListContainer;