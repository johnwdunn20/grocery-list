import React, { useEffect, useState } from 'react'
import Item from './Item'

const Aisle = ({ aisleTitle, itemsArr, deleteItem, toggleCheck }) => {

  const [itemElems, setItemElems] = useState();

  useEffect(() => {
    setItemElems(itemsArr.map(itemObj => {
      console.log('useEffect in ShoppingListContainer');
      return (
        <Item
          key={itemObj.id}
          id={itemObj.id}
          itemName={itemObj.itemName}
          checked={itemObj.checked}
          deleteItem={deleteItem}
          toggleCheck={toggleCheck}
        />
      );
    }))
  }, [itemsArr])

  return (
    <article className="aisle-container">
      <h4 className="aisle-title">{aisleTitle}</h4>
      <ul className="items-list">
        {itemElems}
      </ul>
    </article>
  )
}

export default Aisle;