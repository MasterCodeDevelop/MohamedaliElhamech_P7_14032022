import React, {useState} from 'react';
import {
  useNavigate,
  Link
} from "react-router-dom";
import { API_URL } from '../utils';
import { Cookie } from '../functions';

export default function Login() {
  const URL_API = API_URL+'/api/auth/login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();

   function response (data) {
    
    if(data.id && data.token){

      Cookie.set('id',data.id,1);
      Cookie.set('token',data.token,1);

      window.location.reload()
    } else {
      setError(data)
    }
  }
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
        response(json);
      })
      .catch((res)=>{ console.log(res) })
  };

  return (
    <div className='auth' >
        <div className='auth-container' >
            <h1>Login</h1>
            <form className='form-auth'  onSubmit={onSubmit} >
                <div className='form-group' >
                    <label htmlFor="email">Email <strong>{error.email}</strong></label>
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" id="email" type="email" ></input>
                </div>

                <div className='form-group' >
                    <label htmlFor="password">Mot de passe <strong>{error.password}</strong></label>
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="mot de passe" id="password" type="password" name='password' ></input>
                </div>
                
                <button>Login</button>
            </form>

            <Link className='link' to="/signup">Signup</Link>
        </div>
    </div>
  )
}
