import React from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Profile = ({profileClass, closeProfile}) => {
  const navigate = useNavigate();

  return (
    <section className={profileClass}>
      <button onClick={closeProfile}>&times;</button>
      <Link to='/login'>Sign Out</Link>
    </section>
  )
}

export default Profile;