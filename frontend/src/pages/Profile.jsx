import React,{ useState, useEffect } from 'react'
import { Post, Card, Form } from '../components';
import Modal from '../containers/Modal';

import { profile, Alert } from '../functions';
export default function Profile({session}) {
  var data = {state:null, setState:null}; [data.state, data.setState] = useState(null)
  var openUpdate = {state: null, setState: null}; [openUpdate.state, openUpdate.setState] = useState(false);
  var updateId = {state: null, setState: null}; [updateId.state, updateId.setState] = useState(null);
  const update = {
    open: openUpdate,
    id: updateId
  }
  const { id, email, name, familyName, poste, avatar } = session.state
  var modal = {}; [modal.state, modal.setState] = useState(false);

  const backgrouund = require('../assets/img/background.jpg')
  
  useEffect(()=>{
    if(data.state == null){
      profile.getAll({setData: data.setState});
    }
  },[data])

  return (
    <div className="container">
       
      <div className="card card-user" style={{backgroundImage:backgrouund}} >
        <img src={require('../assets/img/background.webp')} alt="" className='img-background' />
        <div className="card-content">
          <img src={(avatar == null)?require('../assets/img/avatar.png'):avatar} alt="" className='img-avatar' />
          <strong>{name+' '+familyName}</strong>
          <p>{poste}</p>
          <button onClick={()=>{modal.setState(true)}} className='btn btn-outline-secondary' >Modifier le Profile</button>
          <Modal modal={modal} >
            <Setting modal={modal} session={session} data={data} />
          </Modal>
        </div>
      </div>

      <Post.FlatList session={session} data={data.state} setData={data.setState} openUpdate={openUpdate}  updateId={updateId} update={update}/>
    </div>
  )
}


const Setting = ({modal, session, data}) => {
  const [page, setPage] = useState('profil');
  return(
    <div className="profil-setting">
      <SettingHeader page={page} setPage={setPage} />
      <div className="profil-setting__body">
        <Profil page={page} session={session} modal={modal} setPage={setPage} data={data} />
        <Security page={page} session={session} modal={modal} setPage={setPage} />
        <Compte page={page} session={session} modal={modal} setPage={setPage} />
      </div>
    </div>
  )
}
const SettingHeader = ({page, setPage}) => {
  /*useEffect(()=>{
    if(page == 'profile' )
  },[page])*/
  return(
    
    <ul className="profil-setting__header">
      <li className={page =='profil'?'active':''} onClick={()=>{ setPage('profil') }} >Profile</li>
      <li className={page =='security'?'active':''} onClick={()=>{ setPage('security') }} >Sécurité</li>
      <li className={page =='compte'?'active':''} onClick={()=>{ setPage('compte') }} >Compte</li>
    </ul>
  
  )
}

function Profil({page, session, modal, data}){
  const { familyName, name, poste } = session.state;
  const updateProfile = (e) => {
    e.preventDefault(); 
    const closeModal = () => modal.setState(false);
    profile.updateProfil({e, session, closeModal, data})
  }
  return (page != 'profil')?<></>:
  <form  className="profil-form" onSubmit={updateProfile}>
    <div className="form__group">
      <label htmlFor="familyName">Nom </label>
      <input type="text" name="familyName" id="familyName" defaultValue={familyName} />
    </div>
    <div className="form__group">
      <label htmlFor="name">Prénom</label>
      <input type="text" name="name" id="name" defaultValue={name}/>
    </div>
    <div className="form__group">
      <label htmlFor="poste">poste</label>
      <input type="text" name="poste" id="poste" defaultValue={poste} />
    </div>
    <button className="btn btn-primary">Enregistrer</button>
  </form>
}
const Security = ({page, modal}) => {

  return (page != 'security')?<></>:
  <form  className="profil-form" onSubmit={ e => profile.updatePassword({e, modal})}>

    <div className="form__group">
      <label htmlFor="password"> mot de passe </label>
      <input required type="password" name="password" id="password" />
    </div>
    <div className="form__group">
      <label htmlFor="new-password">Nouveau mot de passe </label>
      <input required type="password" name="new-password" id="new-password" />
    </div>
    <button className="btn btn-primary">Enregistrer</button>
  </form>
}
const Compte = ({page, modal}) => {
  return (page != 'compte')?<></>:
  <form  className="profil-form" onSubmit={ e => profile.deleteCompte({e, modal}) }>

    <div className="form__group">
      <p style={{color:'red'}} > Vous êtes sur le point de supprimmer votre compte</p>
    </div>
    <br/>
    <div className="form__group">
      <label htmlFor="password"> mot de passe </label>
      <input required type="password" name="password" id="password" />
    </div>
    <button className="btn btn-danger">Supprimer</button>
  </form>
}

