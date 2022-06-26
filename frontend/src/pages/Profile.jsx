import React,{ useState, useEffect, useRef } from 'react'
import Post from '../components/Post';
import Modal from '../containers/Modal';
import { profile, display } from '../functions';
export default function Profile({session}) {
  var data = {state:null, setState:null}; [data.state, data.setState] = useState(null)
  var openUpdate = {state: null, setState: null}; [openUpdate.state, openUpdate.setState] = useState(false);
  var updateId = {state: null, setState: null}; [updateId.state, updateId.setState] = useState(null);
  const update = {
    open: openUpdate,
    id: updateId
  }
  const { name, familyName, poste, avatar } = session.state
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
        <img src={require('../assets/img/background.webp')} alt="background profile" className='img-background' />
        <div className="card-content">
          <img src={(avatar == '')?require('../assets/img/avatar.png'):display(avatar)} alt="" className='img-avatar' />
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

  return(
    
    <ul className="profil-setting__header">
      <li className={page =='profil'?'active':''} onClick={()=>{ setPage('profil') }} >Profile</li>
      <li className={page =='security'?'active':''} onClick={()=>{ setPage('security') }} >Sécurité</li>
      <li className={page =='compte'?'active':''} onClick={()=>{ setPage('compte') }} >Compte</li>
    </ul>
  
  )
}

function Profil({page, session, modal, data}){
  const { familyName, name, poste, avatar } = session.state,
  [image, setImage] = useState(''),
  [srcImage, setSrcImage] = useState(''),
  refImage = useRef();
  const updateProfile = (e) => {
    e.preventDefault(); 
    const closeModal = () => modal.setState(false);
    profile.updateProfil({e, session, closeModal, data, image, srcImage})
  }
  const onChangeImage = (e) => {
    const newImage = e.target.files
    setSrcImage(newImage);
    let reader = new FileReader()
    reader.readAsDataURL(newImage[0])
    reader.onload = ()=>{
        setImage(reader.result)
    }
  }

  useEffect(()=>{
    if (avatar != '' && srcImage == '') {
      setImage(display(avatar))
    }
  }, [avatar, srcImage])
  return (page != 'profil')?<></>:
  <form  className="profil-form" onSubmit={updateProfile}>
    <div className="profil-form__img">
      <label htmlFor="profil-form__avatar">
        <img src={(image == ''?require('../assets/img/avatar.png'):image)} alt="" className="profil-form__avatar" />
      </label>
      <input ref={refImage} type="file" name="image" id="profil-form__avatar" onChange={ onChangeImage } />
      {
        (image == '')?
          <label htmlFor="profil-form__avatar" className='btn btn-primary'> 
            Ajouter une image
          </label>
        :<>
          <label htmlFor="profil-form__avatar" className='btn btn-warning'> Changer </label>
          <button className="btn btn-danger" type='button' onClick={()=>{ setSrcImage(''); setImage('') }} >Supprimer</button>
        </>
      }
    </div>
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
  <form  className="profil-form" onSubmit={ e => { profile.updatePassword({e, modal})}}>

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

