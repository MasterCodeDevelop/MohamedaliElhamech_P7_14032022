import React from 'react';
import { Link } from "react-router-dom";
import './Login.css';

export default function Signup() {
  return (
    <div className='login'>
      <form method='post' >
        <h1>Signup</h1>

        <div className='form-group' >
          <label htmlFor='name'>name</label>
          <input id="name" type="text" ></input>
        </div>

        <div className='form-group' >
          <label htmlFor="firstName">first name</label>
          <input id="firstName" type="text" ></input>
        </div>

        <div className='form-group' >
          <label htmlFor="email" >Email</label>
          <input id="email" type="email" ></input>
        </div>

        <div className='form-group' >
          <label htmlFor="password" >Password</label>
          <input id="password" type="password" name='password' ></input>
        </div>
        <button type='submit' >Login</button>

        <Link className='link' to="/login">Login</Link>
      </form>

    </div>
  )
}
