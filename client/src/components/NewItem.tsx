import React from "react";

export default function NewItem({saveNewItem}) {
  return (
    <>
      <div className="p-4">
        <section id="new-item-container">
          <form id="add-item-form" action="#" onSubmit={saveNewItem} className="flex flex-col items-center">
            <input id="new-item-input" type="text" placeholder="Add New Item" className="w-80 h-10 border border-gray-300 rounded-md px-2 mb-4" />
            <button id="save-item-button" type="submit" className="w-20 h-10 bg-primaryBlue text-white rounded-md shadow-md">Save</button>
          </form>
        </section>
      </div>
    </>
  );
}