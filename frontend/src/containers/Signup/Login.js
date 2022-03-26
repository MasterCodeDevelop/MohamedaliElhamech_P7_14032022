import React from 'react';
import { Link } from "react-router-dom";
import './Login.css';

export default function Signup() {
  return (
    <div className='login'>
      <form method='post' >
        <h1>Signup</h1>

        <div className='form-group' >
          <lable for="name">name</lable>
          <input id="name" type="text" ></input>
        </div>

        <div className='form-group' >
          <lable for="firstName">first name</lable>
          <input id="firstName" type="text" ></input>
        </div>

        <div className='form-group' >
          <lable for="email">Email</lable>
          <input id="email" type="email" ></input>
        </div>

        <div className='form-group' >
          <lable for="password" >Password</lable>
          <input id="password" type="password" name='password' ></input>
        </div>
        <button type='submit' >Login</button>

        <Link className='link' to="/login">Login</Link>
      </form>

    </div>
  )
}
