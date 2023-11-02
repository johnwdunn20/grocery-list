import React from 'react'

const Item = ({itemName, checked, id, deleteItem}) => {
  console.log('Item invoked');
  return (
    <li>
      {/* onChange is a placeholder right now and doesn't work*/}
      <input type="checkbox" checked={checked} onChange={(e) => !e.target.checked }/>
      <label id={id} htmlFor="">{itemName}</label>
      <button onClick={deleteItem}><span>&times;</span></button>
    </li>
  );
}

export default Item