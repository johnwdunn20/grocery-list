import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable';
import deleteIcon from '../images/delete.svg';

const DeleteItem = ({deleteItem, id}) => {
  console.log('innerWidth', window.innerWidth);

  const [swipeDistance, setSwipeDistance] = useState(0);
  const threshold = 50; // Threshold to delete

  // Only use swipeable on mobile
  if (window.innerWidth < 768) {
    const handlers = useSwipeable({
      onSwiping: (eventData) => {
        if (eventData.deltaX < 0) { // Only set swipe distance if swiping left
          setSwipeDistance(Math.abs(eventData.absX));
        }
      },
      onSwipedLeft: () => {
        if (swipeDistance >= threshold) {
          // deleteItem(id); function needs to be updated so that I have the info I need to delete it
          console.log('DELETED');
        } else {
          setSwipeDistance(0); // Reset swipe distance if the swipe was not enough
        }
      },
      trackMouse: true, // Use trackMouse for desktop testing
      preventScrollOnSwipe: true
    });
  
    // Calculate opacity and translate based on swipe distance
    const deleteOpacity = swipeDistance / threshold;
    const translateX = swipeDistance > threshold ? -threshold : -swipeDistance;
  
    return (
      <div {...handlers} className="relative overflow-hidden flex items-center justify-center">
        <div className='absolute left-0 top-0 right-0 bottom-0 h-full flex items-center  bg-red-500 text-white rounded-md'
             style={{ opacity: deleteOpacity, transition: 'opacity 0.3s ease' }}>
          DELETE
        </div>
        <div className="flex items-center p-4 pl-5"
             style={{ transform: `translateX(${translateX}px)`, transition: 'transform 0.3s ease' }}>
          <img className='w-7 h-7' src={deleteIcon}/>
        </div>
      </div>
    );
  }

  // If desktop, just use a button to delete
  return (
    <button onClick={deleteItem} className="h-8 w-8 rounded flex items-center justify-center hover:bg-slate-400">
    <img className='w-7 h-7' src={deleteIcon}/>
  </button>
  )
}

export default DeleteItem