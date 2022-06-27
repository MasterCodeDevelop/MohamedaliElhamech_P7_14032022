import React from 'react';
import user from '../functions/user';
import icon from '../assets/img/icon.svg'

export default function Login({setActive}) {

  return (
    <div className="auth__user user signinBx">
        <div className="auth__image">
          <img src={require('../assets/img/background.webp')} alt="login img"/>
        </div>
        <div className="auth__formBx">
            <form className='form-auth' onSubmit={user.login} >
              <div className="form-auth__header">
                <h1 className='form-auth__title'>
                  <img src={icon} className='form-auth__icon' alt='icon'/>
                  Groupomania
                </h1>
                <h2 className='form-auth__subtitle'>Connexion</h2>
              </div>
              
              <div className="form-auth__body">
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

              <div className="form-auth__footer">
                <p>Vous n'avez pas de compte ?</p>
                <strong onClick={()=>{setActive(true)}}>Créer un compte</strong>
              </div>
            </form>
        </div>
    </div>
  )
}
