import React from 'react';
import { Link } from "react-router-dom";
import './Login.css';

export default function Login() {
  return (
    <div className='login'>
      <form method='post' >
        <h1>Login</h1>
        <div className='form-group' >
          <lable for="email">Email</lable>
          <input id="email" type="email" ></input>
        </div>

        <div className='form-group' >
          <lable for="password" >Password</lable>
          <input id="password" type="password" name='password' ></input>
        </div>
        <button type='submit' >Login</button>

        <Link className='link' to="/signup">Signup</Link>
      </form>

    </div>
  )
}
