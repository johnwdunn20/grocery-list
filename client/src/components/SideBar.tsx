import React from 'react'

const SideBar = (props) => {
  // console.log('sideBarClass: ', props);
  return (
    <nav className={`${props.sideBarClass} sidebar`}>
      <button onClick={props.closeSideBar}>&times;</button>
      <h1>Shopping List</h1>
      <h1>History</h1>
      <h1>Share</h1>
      <h1>Recipes</h1>
      <h1>My Stores</h1>
    </nav>
  );
}

export default SideBar