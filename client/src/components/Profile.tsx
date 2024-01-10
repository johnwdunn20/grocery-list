import React from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import close from '../images/close.svg'

const Profile = ({ profileOpen, closeProfile,  isLoggedIn }) => {
  const navigate = useNavigate();

  const signOut = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include'
    })
    if (response.ok) {
      navigate('/login');
    }
  }

  const login = () => {
    navigate('/login');
  }

  console.log('isLoggedIn: ', isLoggedIn);

  return (
    <>
      <section className={`flex flex-col fixed top-0 right-0 w-44 lg:w-96 h-full z-20 bg-secondaryBackgroud border-2 shadow-sm transform transition-transform duration-300 ease-in-out ${profileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className='absolute top-2 left-1 rounded-sm'  onClick={closeProfile}>
          <img src={close} alt='close' className='h-12 w-12' />
        </button>
        {isLoggedIn && <button className='text-2xl mt-16 ml-4 self-start hover:text-primaryBlue' onClick={signOut} >Sign Out</button> }
        {!isLoggedIn && <button className='text-2xl mt-16 ml-4 self-start hover:text-primaryBlue' onClick={login} >Log In</button>}
      </section>

    </>
  )
}

export default Profile;