import React from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Profile = ({ profileOpen, closeProfile }) => {
  const navigate = useNavigate();

  // console.log('profileOpen: ', profileOpen);
  return (
    <>
      <section className={`flex flex-col fixed top-0 right-0 w-44 h-full z-20 bg-secondaryBackgroud border-2 shadow-sm transform transition-transform duration-300 ease-in-out ${profileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className='absolute top-2 left-1 text-2xl border-2 rounded-sm'  onClick={closeProfile}>&times;</button>
        <Link className='text-2xl mt-12' to='/login'>Sign Out</Link>
      </section>

    </>
  )
}

export default Profile;