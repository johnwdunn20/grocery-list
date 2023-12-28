import React from "react";
import Categorizing from "./Categorizing";

export default function NewItem({saveNewItem, lastCategory, newItem, setNewItem}) {
  return (
    <>
      <div className="pt-4 flex flex-col items-center">
        <section id="new-item-container">
          <form id="add-item-form" action="#" onSubmit={saveNewItem} className="flex flex-col items-center">
            <input id="new-item-input" type="text" placeholder="Add New Item" className="w-80 h-10 border border-gray-300 rounded-md px-2 mb-4" />
            <button type="submit" className="w-20 h-10 bg-primaryBlue transition-all duration-200 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 text-white rounded-md shadow-md">Save</button>
          </form>
        <Categorizing newItem={newItem} lastCategory={lastCategory} setNewItem={setNewItem}/>
        </section>
      </div>
    </>
  );
}