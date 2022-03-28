import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

export default function Signup({master}) {

  const URL_API = master.api.state.url+'/api/auth/signup';


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState('');



  const Error = ({child}) => (child === "" || child === undefined)?"":<p className='text-danger' >{child}</p>
  //const styleError = (child) => (child === "" || child === undefined)?{color:'black'}:{color:'red'}
  
  useEffect(()=>{
    /*
    if(error.email === "" || error.email === undefined){
      document.getElementById('email').style.color="red"
    }*/
  })

  const onSubmit = (e) => {
    e.preventDefault();
    
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
  };
  const isError = (name) => (error[name])?"error":""
  return (
    <div className='auth'>
        <div className='auth-container' >

            <h1>Signup</h1>
        
            <form onSubmit={onSubmit} >

                <div className='form-group' >
                    <label htmlFor="name">Nom <strong>{error.name}</strong></label>
                    <input  value={name} onChange={(e)=>{setName(e.target.value)}} id="name" placeholder='Prénom' type="text" ></input>
                </div>

                <div className='form-group' >
                    <label htmlFor="firstName">Prénom <strong>{error.firstName}</strong></label>
                    <input value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} id="firstName" placeholder='Nom' type="text" ></input>
                </div>

                <div className='form-group' >
                    <label htmlFor="email">Email <strong>{error.email}</strong></label>
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} id="email" placeholder='Email' type="email" ></input>
                </div>

                <div className='form-group' >
                    <label htmlFor="Mot de passe ">Password <strong>{error.password}</strong> </label>
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} id="password" placeholder='Mot de passe' type="password" name='password' ></input>
                </div>

                <button type='submit'>Submit</button>
            </form>

            <Link className='link' to="/login">Login</Link>

        </div>
    </div>
  )
}
