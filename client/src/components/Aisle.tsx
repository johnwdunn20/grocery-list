import React, { useEffect, useState } from 'react'
import Item from './Item'

const Aisle = ({ aisleTitle, itemsArr, deleteItem, toggleCheck }) => {

  const [itemElems, setItemElems] = useState();

  useEffect(() => {
    setItemElems(itemsArr.map((itemObj, index) => {
      console.log('useEffect in ShoppingListContainer');
      return (
        <Item
          key={itemObj._id}
          id={itemObj._id}
          index={index}
          itemName={itemObj.itemName}
          checked={itemObj.checked}
          deleteItem={deleteItem}
          toggleCheck={toggleCheck}
        />
      );
    }))
  }, [itemsArr])

  return (
    <>
    <section className="m-2 rounded w-full">
    <h1 className="text-primaryBlue text-2xl md:text-xl font-semibold mb-2">{aisleTitle}</h1>
      <ul className="">
        {itemElems}
      </ul>
    </section>
    </>
  )
}

export default Aisle;