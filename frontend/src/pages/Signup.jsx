import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { API_URL } from '../utils';
import { Cookie } from '../functions';

export default function Signup({master}) {

  const URL_API = API_URL+'/api/auth/signup';


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState('');



const onSubmit = (e) => {
  e.preventDefault();
  console.log(URL_API)
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
      Response(json)
    })
    .catch((res)=>{ console.log(res) })
};

function Response(data) {
  console.log(data)
  if(data.error === true) {
    setError(data.response)

  }else if (data.error === false){
    const id = data.response.id;
    const token = data.response.token;

    Cookie.set('id',id,1);
    Cookie.set('token',token,1);
    //window.location.reload()
    master.session.setState({
      id: id, 
      token: token
    })

  }else{
    console.log('fatal error')
    console.log(data)

  }
}
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
