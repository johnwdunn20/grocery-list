import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable';
import deleteIcon from '../images/delete.svg';

const DeleteItemDesktop = ({deleteItem, id}) => {

  // If desktop, just use a button to delete
  return (
    <button onClick={() => deleteItem(id)} className="h-8 w-8 lg:h-5 rounded flex items-center justify-center hover:bg-slate-400">
    <img className='w-7 h-7 lg:h-5' src={deleteIcon}/>
  </button>
  )
}

export default DeleteItemDesktop;