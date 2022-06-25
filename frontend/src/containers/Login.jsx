import React from 'react';
import user from '../functions/user';

export default function Login({setActive}) {


  return (
    <div className="auth__user user signinBx">
        <div className="auth__image">
            <img src={require('../assets/img/background.webp')} alt="login img"/>
        </div>
        <div className="auth__formBx">
            <form className='form-auth' onSubmit={user.login} >
              <div className="form__header">
                <h2 className='form-auth__title'>Se connecter</h2>
              </div>
              
              <div className="form__body">
                <div className='form__group' >
                  <label htmlFor="login-email">Email</label>
                  <input required   placeholder="Adresse e-mail"  id="login-email" autoComplete="current-email" type="email" ></input>
                </div>

                <div className='form__group' >
                    <label htmlFor="login-password">Mot de passe</label>
                    <input required  placeholder="Mot de passe" id="login-password" type="password" name='password' autoComplete="current-password" ></input>
                </div>

                <div className="form__group">
                  <button className="btn btn-primary" type='submit' >Login</button>
                </div>
              </div>

              <div className="form__footer">
                <p>Vous n'avez pas de compte et vous voulez en créer un ?</p>
                <button className='btn btn-success' type='button' onClick={()=>{ setActive(true) }} >Créer un nouveau compte</button>
              </div>
              
            </form>
        </div>
    </div>
  )
  /*return (
    <div className='card' >
      <h1>Login</h1>
      <form className='form auth-form'  onSubmit={onSubmit} >
        
          <div className='form__group' >
              <label htmlFor="login-email">Email <strong>{error.email}</strong></label>
              <input ref={email}  placeholder="Adresse e-mail" id="login-email" type="email" ></input>
          </div>

          <div className='form__group' >
              <label htmlFor="login-password">Mot de passe <strong>{error.password}</strong></label>
              <input ref={password}  placeholder="Mot de passe" id="login-password" type="password" name='password' ></input>
          </div>
          
          <button className='btn btn-primary' >Login</button>
  
      </form>
      <button className='btn btn-success' onClick={()=>{modal.setState(!modal.state)}} >Créer un nouveau compte</button>
    </div>
  )*/
}
