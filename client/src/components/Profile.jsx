import React from 'react'

const Profile = ({profileClass, closeProfile}) => {
  return (
    <section className={profileClass}>
      <button onClick={closeProfile}>&times;</button>
      <a href="#">Sign Out</a>
    </section>
  )
}

export default Profile;