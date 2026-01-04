import './login.css';
import '../../pages/general.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState,useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from "axios";
import { useEffect } from 'react';

const Login = () => {
   const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })
  const [err,setError] = useState(null);

  const navigate = useNavigate();

  const {currentUser,login,isLoading} = useContext(AuthContext);

  // navigate to homepage when there is a logged in user and the login page is accessed
  useEffect(() => {
    if(currentUser) {
      navigate("/");
    }
  },[currentUser,navigate])
  const handleChange = e => {
    setInputs(prev=>({...prev,[e.target.name] : e.target.value}))
  }
 

  const handleSubmit = async e => {
  e.preventDefault()
  try {
    await login(inputs)
    // await axios.post("http://localhost:8800/api/auth/login", inputs);
    navigate("/");
    
  } catch (err) {
    console.log(err.response ? err.response.data : err.message)
    setError(err.response.data || "An error occurred")
  }
}

  return (
    <div className='login'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder='Username' onChange={handleChange}/>
        <input type="password" name="password" placeholder='Password'onChange={handleChange}/>
        { err && <p className='text-center'>{err}</p>}
        <button disabled={isLoading}>
          {isLoading ? "Logging in..." : "Signin"}
        </button>
        <span>Don't have an account? <Link to='/register'>Register</Link>.</span>
      </form>
    </div>
  )
}

export default Login