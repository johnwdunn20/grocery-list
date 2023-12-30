import React from 'react'
import DeleteItem from './DeleteItem';

const Item = ({itemName, checked, id, deleteItem, toggleCheck, index}) => {


  return (
    <>
    <div className={`flex items-center justify-between w-full h-full lg:h-6 py-0 pr-0 pl-4 rounded-md
      ${index % 2 === 0 ? 'bg-secondaryBackgroud' : 'bg-primaryBackgroud'}
    `}>
      {/* onChange is a placeholder right now and doesn't work*/}
      <input type="checkbox" checked={checked} onChange={toggleCheck} className=" pl-8 py-4 h-8 w-8 lg:h-4 focus:ring-2 focus:ring-secondaryBlue "/>
      <label id={id} htmlFor="" className="text-primaryBlue py-4 text-lg">{itemName}</label>
      <DeleteItem deleteItem={deleteItem} id={id}/>
    </div>
    </>
  );
}

export default Item