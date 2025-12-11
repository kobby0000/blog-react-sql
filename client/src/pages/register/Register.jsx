import React from 'react';
import './register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className='login'>
          <h1>Register</h1>
          <form action="">
            <input type="text" name="username" id="username"  placeholder='Username'/>
            <input type="email" name="email" id="email" placeholder='Email'/>
            <input type="password" name="password" id="password" placeholder='Password'/>
            <p className='text-center'>error message</p>
            <button>Register</button>
            <span>Don't have an account? <Link to='/Login'>Login</Link>.</span>
          </form>
        </div>
  )
}

export default Register