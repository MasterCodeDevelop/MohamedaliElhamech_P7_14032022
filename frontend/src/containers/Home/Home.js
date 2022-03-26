import React, {useState} from 'react'
import './Home.css'

export default function Home() {
  var modal = {state:null, setState:null}; [modal.state, modal.setState] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <main id="home" >
      <div className='' >
        <p>{(modal.state?"ouvert":"fermer")}</p>
        <button onClick={()=>{modal.setState(!modal.state)}}>
          Ecrivez quelque chose
        </button>
      </div>
      <section id='modal' className= {modal.state?"active":""} >
        <div className='modal-container'>
          <div className='modal-backdrop' onClick={()=>{modal.setState(false)}} ></div>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>Créer une publication</h2>
              <button className='btn-close' onClick={()=>{modal.setState(false)}} >close</button>
            </div>
            <form method='post' >
              <div className='form-group' >
                <label htmlFor='title' >titre</label>
                <input value={title} type= "text" id='title' name='title' onChange={(e)=>{setTitle(e.target.value)}}></input>
              </div>
              <div className='form-group' >
                <label htmlFor='description'>description</label>
                <textarea value={description} id='description' name='description' onChange={(e)=>{setDescription(e.target.value)}} ></textarea>
              </div>
              <button onClick={()=>{console.log({title: title, description:description})}} >envoyer</button>
            </form>

          </div>
        </div>
      </section>
    </main>
  )
}
