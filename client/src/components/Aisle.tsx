import React, { useEffect, useState } from 'react'
import Item from './Item'

type AisleProps = {
  aisleTitle: string,
  itemsArr: Array<any>,
  deleteItem: (id: string, categoryId: string) => void,
  toggleCheck: Function,
  categoryId: string
}

const Aisle:React.FC<AisleProps> = ({ aisleTitle, itemsArr, deleteItem, toggleCheck, categoryId }) => {

  const [itemElems, setItemElems] = useState([]);

  useEffect(() => {
    setItemElems(itemsArr.map((itemObj, index) => {
      // console.log('useEffect in ShoppingListContainer');
      return (
        <Item
          key={itemObj._id}
          id={itemObj._id}
          index={index}
          itemName={itemObj.itemName}
          checked={itemObj.checked}
          deleteItem={deleteItem}
          toggleCheck={toggleCheck}
          categoryId={categoryId}
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