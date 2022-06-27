import React from 'react';
import user from '../functions/user'
import icon from '../assets/img/icon-left-font-monochrome-white.svg'


export default function Signup({setActive}) {

  return(
    <div className=" auth__user user signupBx">
      <div className="auth__formBx">

        
        <form className='form-auth' onSubmit={user.signup} >
          <div className="form-auth__header">
            <h1 className='form-auth__title'>
              <img src={icon} className='form-auth__icon' alt='icon'/>
              Groupomania
            </h1>
            <h2 className='form-auth__subtitle'>S'inscrire</h2>
          </div>

          <div className="form__body">
            <div className='form__group' >
                <label htmlFor="signup-familyName">Nom</label>
                <input required  id="signup-familyName" placeholder='Nom' type="text" ></input>
            </div>

            <div className='form__group' >
                <label htmlFor="signup-name">Prénom</label>
                <input required  id="signup-name" placeholder='Prénom' type="text" ></input>
            </div>

            <div className='form__group' >
                <label htmlFor="signup-email">Email</label>
                <input required   id="signup-email" placeholder='Email' type="email" autoComplete="current-email" ></input>
            </div>

            <div className='form__group' >
                <label htmlFor="signup-password">Password </label>
                <input required  placeholder="Mot de passe" id="signup-password"  type="password" name='password' autoComplete="current-password" ></input>
            </div>

            <button className='btn btn-primary' type='submit'>S'inscrire</button>
          </div>
          
          <div className="form-auth__footer">
            <p>Vous avez déjà de compte ?</p>
            <strong onClick={()=>{setActive(false)}} >Se connecter</strong>
          </div>
        </form>
      </div>
      <div className="imgBx auth__image">
          <img src={require('../assets/img/register.jfif')} alt="register img"/>
      </div>
  </div>     
  )
}
