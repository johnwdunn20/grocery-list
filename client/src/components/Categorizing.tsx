import React, {useState, useEffect} from 'react'

const Categorizing = ({ lastCategory, newItem, setNewItem }) => {

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (newItem) {
      setShow(true);
      if (lastCategory) {
        setTimeout(() => {
          setNewItem('');
          setShow(false);
        }, 1500);
      }
    }
  }, [newItem, lastCategory, setNewItem]);

  return (
    <section className={` newCategorization flex justify-between items-center w-full h-12 rounded-md mt-2 text-white transition-all duration-500 ease-in-out transform ${show ? 'translate-y-0 bg-green-700 border-2' : 'translate-y-full'}`}>
      {newItem && <p className='pl-4'>{newItem}</p>}
      {newItem && !lastCategory && <div className='spinner'></div>}
      {lastCategory && newItem && <p className='pr-4'>{lastCategory}</p>}
    </section>
  )
  
}

export default Categorizing