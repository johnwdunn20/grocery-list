import React from "react";

export default function NewItem() {
  return (
    <>
      <h3>Add Item</h3> 
      <section id="new-item-container">
        <form id="add-item-form" action="#">
          <input id="new-item-input" type="text" />
          <input id="save-item-button" type="submit" value="Save"/>
        </form>
      </section>
    </>
  );
}