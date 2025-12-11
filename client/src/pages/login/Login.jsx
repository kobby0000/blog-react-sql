import React from 'react';
import './login.css';
import '../../pages/general.scss';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='login'>
      <h1>Login</h1>
      <form action="">
        <input type="text" name="username" id="username"  placeholder='Username'/>
        <input type="password" name="password" id="password" placeholder='Password'/>
        <p className='text-center'>error message</p>
        <button>Signin</button>
        <span>Don't have an account? <Link to='/register'>Register</Link>.</span>
      </form>
    </div>
  )
}

export default Login