import React, {useState} from 'react';
import {
  useParams,
  useNavigate,
  useLocation,
  Link
} from "react-router-dom";import './Login.css';

export default function Login({master}) {
  const URL_API = master.api.state.url+'/api/auth/login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const loginFetch = () =>{
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
  }
  function response (data) {
    console.log(data)
    if(data.id && data.token){
      master.user.setState({
        id: data.id,
        token: data.token
      })
      navigate("/home")
    } else {
      setError(data)
    }
  }
  return (
    <div className='form-container'>
      <form className='form' >
        <h1>Login</h1>
        <div className='form-group' >
          <label htmlFor="email">{error.email}</label>
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" id="email" type="email" ></input>
        </div>

        <div className='form-group' >
          <label htmlFor="password">{error.password}</label>
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}} id="password" type="password" name='password' ></input>
        </div>
        <button type='button' onClick={loginFetch} >Login</button>

        <Link className='link' to="/signup">Signup</Link>
      </form>

    </div>
  )
}
