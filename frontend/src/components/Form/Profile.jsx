import React from 'react'

export default function Profile() {
  return (
    <div className="form-body profile">
      <div className="form-group">
        <label htmlFor="profile-photo">Photo de profil</label>
        <input type="file" name="" id="profile-photo" />
      </div>
      <div className="form-group">
        <label htmlFor="profile-familyName">Nom</label>
        <input type="text" id="familyName" placeholder='Tapez votre nomm de famille' />
      </div>
      <div className="form-group">
        <label htmlFor="profile-name">Prénom</label>
        <input type="text" id='profile-name' placeholder='Tapez Votre prénom' />
      </div>
      <div className="form-group">
        <label htmlFor="profile-name">Poste</label>
        <input type="text" id='profile-name' />
      </div>
      <div className="form-group">
        <label htmlFor="profile-name">Poste</label>
        <input type="text" id='profile-name' />
      </div>
      <div className="form-group">
        <label htmlFor="profile-name">Poste</label>
        <input type="text" id='profile-name' />
      </div>
      <div className="form-group">
        <label htmlFor="profile-name">Poste</label>
        <input type="text" id='profile-name' />
      </div>
      <div className="form-group">
        <label htmlFor="profile-name">Poste</label>
        <input type="text" id='profile-name' />
      </div>
      <button className="btn btn-primary">
        Enregister
      </button>
    </div>
  )
}
