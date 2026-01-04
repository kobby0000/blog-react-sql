import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: "",
    password: '',
  })
  const [err,setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev=>({...prev,[e.target.name] : e.target.value}))
  }
 
  const handleSubmit = async e => {
  e.preventDefault()
  try {
    await axios.post("http://localhost:8800/api/auth/register", inputs);
    navigate("/login");
    
  } catch (err) {
    console.log(err.response ? err.response.data : err.message)
    setError(err.response.data)
  }
}

  return (
    <div className='login'>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" name="username"  placeholder='Username' onChange={handleChange}/>
            <input type="email" name="email" placeholder='Email' onChange={handleChange}/>
            <input type="password" name="password" placeholder='Password' onChange={handleChange}/>
           <button type='submit'>Register</button>
           {err && <p>{err}</p>}
            <span>Don't have an account? <Link to='/Login'>Login</Link>.</span>
          </form>
        </div>
  )
}

export default Register