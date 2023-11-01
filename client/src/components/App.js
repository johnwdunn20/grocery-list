import React from "react";

const App = () => {
  return (
    <>
      <header className="header">
        <img id="hamburger" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/2048px-Hamburger_icon.svg.png" alt="hamburger" />
        <h1>Shoppping List</h1>
        <img id="profile" src="https://static.thenounproject.com/png/638636-200.png" alt="Profile" />
      </header>
      <main>
        <h3>Add Item</h3>
        <section id="new-item-container">
          <form id="add-item-form" action="#">
            <input id="new-item-input" type="text" />
            <input id="save-item-button" type="submit" value="Save"/>
          </form>
        </section>
        <h3>Shopping List</h3>
        <section id="list-buttons">
            <input type="button" value="Clear Found Items"/>
            <input type="button" value="Clear All"/>
        </section>
        <section id="list-container">
          <article className="aisle-container">
            <h4 className="aisle-title">Breakfast</h4>
            <ul className="items-list">
              <li>
                <input type="checkbox" />
                <label for="">Raisin Bran</label>
                <button><span>&times;</span></button>
              </li>
              <li>
                <input type="checkbox" />
                <label for="">Cereal</label>
                <button><span>&times;</span></button>
              </li>
              <li>
                <input type="checkbox" />
                <label for="">Oatmeal</label>
                <button><span>&times;</span></button>
              </li>
            </ul>
          </article>
          <article className="aisle-container">
            <h4 className="aisle-title">Breakfast</h4>
            <ul className="items-list">
              <li>
                <input type="checkbox" />
                <label for="">Raisin Bran</label>
                <button><span>&times;</span></button>
              </li>
              <li>
                <input type="checkbox" />
                <label for="">Cereal</label>
                <button><span>&times;</span></button>
              </li>
              <li>
                <input type="checkbox" />
                <label for="">Oatmeal</label>
                <button><span>&times;</span></button>
              </li>
            </ul>
          </article>
          <article className="aisle-container">
            <h4 className="aisle-title">Breakfast</h4>
            <ul className="items-list">
              <li>
                <input type="checkbox" />
                <label for="">Raisin Bran</label>
                <button><span>&times;</span></button>
              </li>
              <li>
                <input type="checkbox" />
                <label for="">Cereal</label>
                <button><span>&times;</span></button>
              </li>
              <li>
                <input type="checkbox" />
                <label for="">Oatmeal</label>
                <button><span>&times;</span></button>
              </li>
            </ul>
          </article>
          <article className="aisle-container">
            <h4 className="aisle-title">Breakfast</h4>
            <ul className="items-list">
              <li>
                <input type="checkbox" />
                <label for="">Raisin Bran</label>
                <button><span>&times;</span></button>
              </li>
              <li>
                <input type="checkbox" />
                <label for="">Cereal</label>
                <button><span>&times;</span></button>
              </li>
              <li>
                <input type="checkbox" />
                <label for="">Oatmeal</label>
                <button><span>&times;</span></button>
              </li>
            </ul>
          </article>
          <article className="aisle-container">
            <h4 className="aisle-title">Breakfast</h4>
            <ul className="items-list">
              <li>
                <input type="checkbox" />
                <label for="">Raisin Bran</label>
                <button><span>&times;</span></button>
              </li>
              <li>
                <input type="checkbox" />
                <label for="">Cereal</label>
                <button><span>&times;</span></button>
              </li>
              <li>
                <input type="checkbox" />
                <label for="">Oatmeal</label>
                <button><span>&times;</span></button>
              </li>
            </ul>
          </article>
        </section>
      </main>
    </>
  );
};

export default App;