import React, { useState } from 'react'
import Modal from '../../containers/Modal';
import Form from '../Form/index'
export default function User({session}) {
  var modal = {}; [modal.state, modal.setState] = useState(false);

  /*const backgrouund = 'https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.6435-9/198781487_494669448461148_3068970148347819182_n.jpg?_nc_cat=106&ccb=1-6&_nc_sid=e3f864&_nc_ohc=By1eBZ75H6cAX_VUlaS&_nc_ht=scontent.fcdg1-1.fna&oh=00_AT9QbPbKngy-bcIHFNX_SrOsTePqR2LhyW-TQf6oMl-eZw&oe=62A428F8'
  const avatar = "https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.6435-1/199673479_494669051794521_6202437076424504985_n.jpg?_nc_cat=100&ccb=1-6&_nc_sid=7206a8&_nc_ohc=E1c4WMItOeUAX-VmR4Z&_nc_ht=scontent.fcdg1-1.fna&oh=00_AT-am9FyCcN1TVLBP9jjvg7Wc3hoed8_bJZDMJNyq8la5Q&oe=62A37E5D"
  
  return (
    <div className="card card-user" style={{backgroundImage:backgrouund}} >
      <img src={backgrouund} alt="" className='img-background' />
      <div className="card-content">
        <img src={avatar} alt="" className='img-avatar' />
        <strong> Mohamed Ali</strong>
        <p>Commercial</p>
        <p>0 abonné</p>
        <button onClick={()=>{modal.setState(true)}} className='btn btn-outline-secondary' >Modifier le Profile</button>
        <Modal modal={modal} >
          <div className="card form">
            <div className="form-header">
              <h2>Préférences</h2>
              <button type='button' className='btn btn-danger' >X</button>
            </div>
            <Form.Profile />
          </div>
        </Modal>
      </div>
    </div>
  )*/
}
