import React, { useState, useEffect } from 'react'
import arrow from '../images/arrow.svg'

const Categorizing = ({ lastCategory, newItem, updateNewItem, resetLastCategory }) => {

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (newItem) {
      setShow(true);
      if (lastCategory) {
        setTimeout(() => {
          updateNewItem('');
          resetLastCategory();
          setShow(false);
        }, 1500);
      }
    }
  }, [newItem, lastCategory]);

  // console.log('lastCategory: ', lastCategory);

  return (
    <>
      <section className={`newCategorization flex justify-around z-0 items-center w-full h-12 rounded-md mt-2 text-white transition-all duration-500 ease-in-out transform ${show ? 'translate-y-0 bg-green-700 border-2' : 'translate-y-full'}`}>
        {newItem && <p className='pl-4 text-lg'>{newItem}</p>}
        {newItem &&
          <div className='container w-auto h-full flex items-center justify-center'>
            <img className='h-full' alt='arrow' src={arrow}></img>
          </div>}
        {newItem && !lastCategory && <div className='spinner'></div>}
        {lastCategory && newItem && <p className='pr-4 font-semibold'>{lastCategory.toString()}</p>}
      </section>
    </>
  )

}

export default Categorizing