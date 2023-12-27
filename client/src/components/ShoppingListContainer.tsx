import React, { useEffect, useState } from 'react'
import Aisle from './Aisle'

const ShoppingListContainer = ({ groceries, deleteItem, toggleCheck }) => {
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
          toggleCheck={toggleCheck}
        />
      );
    }))
  }, [groceries])

  return (
    <>

      <div className="p-4 w-full lg:w-3/4 xl:w-2/3 mx-auto">
        <section className="flex justify-evenly mb-4">
          <button className="bg-secondaryBlue text-white rounded-md py-2 px-4 shadow-md">Clear Found Items</button>
          <button className="bg-secondaryBlue text-white rounded-md py-2 px-4 shadow-md">Clear All</button>
        </section>
        <section className="flex flex-col items-start w-full">
          {aisleElems}
        </section>

      </div>
    </>
  )
}

export default ShoppingListContainer;