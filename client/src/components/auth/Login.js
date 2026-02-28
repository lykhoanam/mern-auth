import React, {useState} from 'react'
import {Link, Navigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import {login} from '../../actions/auth'

const Login = () => {
  const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    
  const [formData, updateFormData] = useState({
    email: "",
    password: "",
  }) 
  const { email, password} = formData;
  
  //onchange handle configured to handle change for all fields
  const onChange = (e) => updateFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });

  //onSubmit handler
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }));
  }
  
  if(isAuthenticated){
    return <Navigate to="/welcome" />
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={e => onSubmit(e)}>
        <div>
          <input 
            type="email" 
            placeholder='Email address' 
            name="email" 
            value={email} 
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <input 
            type="password" 
            placeholder='Password' 
            name="password" 
            value={password} 
            onChange={(e) => onChange(e)}
            minLength='4'
            required
          />
        </div>
        <input type="submit" value="Login"/>
        <p>
          Not registered yet? <Link to="/register">Register </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
