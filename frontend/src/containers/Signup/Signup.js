import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import './Signup.css';

export default function Signup({master}) {

  const URL_API = master.api.state.url+'/api/auth/signup';


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState('');

  const Register = () =>{
    /*console.log({
      name: name,
      firstName: firstName,
      email: email,
      password: password
    })*/
    fetch(URL_API, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password      
      })
    })
    .then((response) => response.json())
    .then((json) => {
      setError(json.message)
    })
    .catch((res)=>{ console.log(res) })
  }

  const Error = ({child}) => (child === "" || child === undefined)?"":<p className='text-danger' >{child}</p>
  //const styleError = (child) => (child === "" || child === undefined)?{color:'black'}:{color:'red'}
  
  useEffect(()=>{
    /*
    if(error.email === "" || error.email === undefined){
      document.getElementById('email').style.color="red"
    }*/
  })
  const isError = (name) => (error[name])?"error":""
  return (
    <div className='login'>
      <form method='post' >
        <h1>Signup</h1>

        <div className='form-group' >
          <label htmlFor='name'>name</label>
          <input  value={name} onChange={(e)=>{setName(e.target.value)}} id="name" type="text" ></input>
        </div>

        <div className='form-group' >
          <label htmlFor="firstName">first name</label>
          <input value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} id="firstName" type="text" ></input>
        </div>

        <div className={'form-group '+isError('email')} >
          <label htmlFor="email" >Email</label>
          <p className='text-danger' >{error.email}</p>
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} id="email" type="email" ></input>
        </div>

        <div className='form-group' >
          <label htmlFor="password" >Password</label>
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}} id="password" type="password" name='password' ></input>
        </div>
        <button type='button' onClick={Register} >Login</button>

        <Link className='link' to="/login">Login</Link>
      </form>

    </div>
  )
}
