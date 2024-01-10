import React, { useState } from "react";
import Categorizing from "./Categorizing";

export default function NewItem({saveNewItem, lastCategory, newItem, updateNewItem, resetLastCategory}) {

  const [itemSaved, setItemSaved] = useState(false);

  const formSubmitted = (e) => {
    saveNewItem(e);
    setItemSaved(true);
    setTimeout(() => {
      setItemSaved(false);
    }, 2500);
  }

  return (
    <>
      <div className="pt-4 flex flex-col items-center">
        <section id="new-item-container">
          <form id="add-item-form" action="#" onSubmit={formSubmitted} className="flex flex-col items-center">
            <input id="new-item-input" type="text" placeholder="Add New Item" className="w-80 h-10 border border-gray-300 rounded-md px-2 mb-4" />
            <button type="submit" className="w-20 h-10 bg-primaryBlue transition-all duration-200 ease-in-out hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 text-white rounded-md shadow-md">Save</button>
          </form>
         <div className={`${itemSaved ? 'visible' : 'invisible'}`}>
          <Categorizing newItem={newItem} lastCategory={lastCategory} updateNewItem={updateNewItem} resetLastCategory={resetLastCategory}/>
         </div>

        </section>
      </div>
    </>
  );
}