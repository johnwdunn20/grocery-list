import React from 'react'
import deleteIcon from '../images/delete.svg';

const Item = ({itemName, checked, id, deleteItem, toggleCheck, index}) => {
  console.log('Item invoked');
  return (
    <>
    <div className={`flex items-center justify-between w-full p-4 rounded-md
      ${index % 2 === 0 ? 'bg-secondaryBackgroud' : 'bg-primaryBackgroud'}
    `}>
      {/* onChange is a placeholder right now and doesn't work*/}
      <input type="checkbox" checked={checked} onChange={(e) => !e.target.checked } onClick={toggleCheck} className="h-8 w-8 bg-secondaryBlue "/>
      <label id={id} htmlFor="" className="text-primaryTextColor">{itemName}</label>
      <button onClick={deleteItem} className="h-8 w-8 rounded bg-secondaryBlue flex items-center justify-center">
        <img src={deleteIcon}/>
      </button>
    </div>
    </>
  );
}

export default Item