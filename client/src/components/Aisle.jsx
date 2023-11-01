import React from 'react'
import Item from './Item'

const Aisle = () => {
  return (
    <article className="aisle-container">
      <h4 className="aisle-title">Breakfast</h4>
      <ul className="items-list">
        {/* Item (each li) */}
        <Item/>
        <Item/>
        <Item/>
      </ul>
    </article>
  )
}

export default Aisle