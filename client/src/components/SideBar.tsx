import React from 'react'

const SideBar = (props) => {

  // console.log('sideBarOpen: ', props.sideBarOpen);
  return (
    <>
      {/* <nav id="sideMenu" className={`fixed top-0 right-0 w-80 h-full z-20 bg-gray-800 shadow-lg transform ${props.sideBarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <button onClick={props.closeSideBar} className="absolute top-4 right-4 text-white text-2xl">&times;</button>
        <h1 className="text-white text-2xl">Shopping List</h1>
        <h1 className="text-white text-2xl">History</h1>
      </nav> */}
      <nav id="sideMenu" className={`fixed top-0 left-0 w-64 h-full z-20 bg-secondaryBackgroud border-2 shadow-sm transform ${props.sideBarOpen ? '-translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <button className='absolute top-2 right-1 text-2xl border-2 rounded-sm' onClick={props.closeSideBar}>&times;</button>
        <h1 className="text-2xl m-2">Shopping List</h1>
        <h1 className="text-2xl m-2">History</h1>
      </nav>
    </>
  );
}

export default SideBar