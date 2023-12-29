import React from 'react'
import close from '../images/close.svg'

const SideBar = (props) => {

  // console.log('sideBarOpen: ', props.sideBarOpen);
  return (
    <>
      <nav id="sideMenu" className={`fixed top-0 left-0 w-64 h-full z-20 bg-secondaryBackgroud border-2 shadow-sm transform ${props.sideBarOpen ? '-translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className='flex justify-between content-center border-b-2 border-slate-500'>
          <h1 className='text-3xl text-primaryBlue font-bold mt-5 m-2'>Navigate</h1>
          <button className='rounded-sm' onClick={props.closeSideBar}>
            <img src={close} alt='close' className='h-12 w-12' />
          </button>
        </div>
        <h1 className="text-2xl m-2 mt-5">Shopping List</h1>
        <h1 className="text-2xl m-2">History</h1>
      </nav>
    </>
  );
}

export default SideBar