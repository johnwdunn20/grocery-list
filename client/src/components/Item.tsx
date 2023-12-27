import React from 'react'

const Item = ({itemName, checked, id, deleteItem, toggleCheck}) => {
  console.log('Item invoked');
  return (
    <li>
      {/* onChange is a placeholder right now and doesn't work*/}
      <input type="checkbox" checked={checked} onChange={(e) => !e.target.checked } onClick={toggleCheck}/>
      <label id={id} htmlFor="">{itemName}</label>
      <button  onClick={deleteItem}><span>&times;</span></button>
      <div className="border-red-500">hello</div>
    </li>
  );
}

export default Item