import React, {useState} from 'react';
import {
  useNavigate,
  Link
} from "react-router-dom";

export default function Login({master}) {
  const URL_API = master.api.state.url+'/api/auth/login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();

 
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
                    <label htmlFor="email">{error.email}</label>
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" id="email" type="email" ></input>
                </div>

                <div className='form-group' >
                    <label htmlFor="password">{error.password}</label>
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="mot de passe" id="password" type="password" name='password' ></input>
                </div>
                
                <button>Login</button>
            </form>

            <Link className='link' to="/signup">Signup</Link>
        </div>
    </div>
  )
}
