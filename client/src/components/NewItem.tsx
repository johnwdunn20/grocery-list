import React from "react";

export default function NewItem({saveNewItem}) {
  return (
    <>
      <h3></h3> 
      <section id="new-item-container">
        <form id="add-item-form" action="#" onSubmit={saveNewItem}>
          <input id="new-item-input" type="text" placeholder="Add an item here"/>
          <input id="save-item-button" type="submit" value="Save"/>
        </form>
      </section>
    </>
  );
}