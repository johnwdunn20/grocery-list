import React, { useEffect, useState } from 'react'
import Aisle from './Aisle'

type ShoppingListContainerProps = {
  groceries: Array<any>,
  deleteItem: Function,
  toggleCheck: Function,
  clearAll: Function,
  clearFound: Function,
  showHidePurchasedItems: Function
}

const ShoppingListContainer = ({ groceries, deleteItem, toggleCheck, clearAll, clearFound, showHidePurchasedItems}) => {
  // console.log('Groceries: ', groceries);

  const [aisleElems, setAisleElems] = useState([])
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    showHidePurchasedItems();
  }

  useEffect(() => {
    setAisleElems( groceries.map(aisleNameAndItems => {
      // console.log('useEffect in ShoppingListContainer');
      return (
        <Aisle
          aisleTitle={aisleNameAndItems.category}
          key={aisleNameAndItems.category}
          itemsArr={aisleNameAndItems.items}
          deleteItem={deleteItem}
          toggleCheck={toggleCheck}
          categoryId={aisleNameAndItems._id}
        />
      );
    }))
  }, [groceries])

  return (
    <>

      <div className="p-4 w-full lg:w-3/4 xl:w-2/3 mx-auto">
        <section className="flex justify-evenly mb-4 z-10">
          <button className="bg-secondaryBlue text-white rounded-md py-2 px-4 shadow-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200 ease-in-out" onClick={clearFound}>Clear Found Items</button>
          <button className="bg-secondaryBlue text-white rounded-md py-2 px-4 shadow-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200 ease-in-out" onClick={clearAll}>Clear All</button>
        </section>

        <section className="flex items-center mt-6">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="hidden" checked={isToggled} onChange={handleToggle} />
              <div className=" bg-secondaryBlue border-2 border-gray-400 h-8 w-16 lg:h-4 lg:w-8 rounded-full"></div>
              <div className={`absolute left-0 top-0 bg-primaryBlue w-8 h-8 lg:w-4 lg:h-4 rounded-full transition transform
                ${isToggled ? 'translate-x-full' : ''}`}></div>
            </div>
            <h2 className="ml-3 text-secondaryBlue text-lg">
              {isToggled ? 'Show Purchased Items' : 'Hide Purchased Items'}
            </h2>
          </label>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          {aisleElems}
        </section>

      </div>
    </>
  )
}

export default ShoppingListContainer;