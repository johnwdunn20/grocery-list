import React from 'react'

const Item = ({itemName, checked}) => {
  console.log('Item invoked');
  return (
    <li>
      {/* onChange is a placeholder right now and doesn't work*/}
      <input type="checkbox" checked={checked} onChange={(e) => !e.target.checked }/>
      <label htmlFor="">{itemName}</label>
      <button><span>&times;</span></button>
    </li>
  );
}

export default Item