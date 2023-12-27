import React from 'react'
import { useNavigate } from 'react-router'

const Login = () => {
  const navigate = useNavigate();

  return (
    <main>
    <h1>Shopping List</h1>
    <section className='login-container'>
      <h3>Login</h3>
      <form action="#" className='login-form' onSubmit={() => navigate('/')}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" />
        </div>
        <input id='submit-button' type="submit" name="" value="Login"/>
      </form>
    </section>
    </main>
  )
}

export default Login