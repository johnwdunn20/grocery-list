import React from 'react'
import Aisle from './Aisle'

const ShoppingListContainer = () => {
  return (
    <>
      <h3>Shopping List</h3>
      <section id="list-buttons">
          <input type="button" value="Clear Found Items"/>
          <input type="button" value="Clear All"/>
      </section>
      
      <section id="list-container">
        {/* Aisle (each article)*/}
        <Aisle/>
        <Aisle/>
      </section>
    </>
  )
}

export default ShoppingListContainer;