import React,{useState} from 'react'

import Comment from '../Comment/index';
import Like from './Like';
import { display, post } from '../../functions';
import { useEffect } from 'react';

export default function Card({dataItem, data, setData,  session, index}) {

  const  { id, user_id, name, avatar, familyName, createdAt} = dataItem,
  { id:userId , isAdmin } = session.state,
  imageUrl = display(dataItem.imageUrl),
  [likes, setLikes] = useState(JSON.parse(dataItem.likes)),
  [edit, setEdit] = useState(false),
  [content, setContent] = useState(dataItem.content),
  [image, setImage] = useState(null),
  [srcImage, setSrcImage] = useState(''),
  [disabled, setDisabled] = useState(false),

  onChangeContent = (e) => {
    setContent(e.target.value)
  },
  onChangeImage = (e) => {
    const newImage = e.target.files
    setSrcImage(newImage);
    let reader = new FileReader()
    reader.readAsDataURL(newImage[0])
    reader.onload = () => {
      setImage(reader.result)
    }
  },
  open = (id) => {
    setEdit(true)
    setTimeout(()=>{
      document.querySelector('#post-update-content-'+id).focus();
    },100)
  },
  cancel = () => {
    setEdit(false);
    setSrcImage('');
    if(  dataItem.imageUrl !== '') {
      setImage(imageUrl)
    }
    setContent(dataItem.content);

  },
  onSubmit = () => {
    if( image === imageUrl && content === dataItem.content) {
      setEdit(false)
    } else {
      var formData = new FormData();
      formData.append("id", id);
      formData.append("content", content);
      if(image === '') {
        formData.append("image", null);
      } else {
        srcImage && formData.append("image", srcImage[0]);
      }
      

      post.update({index, formData, data, setData, setEdit});
    }
  }
  const postDelete = (id, index) => {
    post.delete({index, id, data, setData})
}
  useEffect(()=>{

    // SET IMAGE
    if(  dataItem.imageUrl !== '' && srcImage === '' && image == null ) {
      setImage(imageUrl)
    }

    // disabled
    if (content === dataItem.content && srcImage === '' && ( image === imageUrl || image == null ) ) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  },[content, image, srcImage, imageUrl, dataItem])
  return (
    edit?<form className="post-form  card">
        <div className="form__header">
          <div className="post-form__user">
            <img className="img-avatar" src={(avatar === '')?require('../../assets/img/avatar.png'):display(avatar)} alt="" />
            <p>
                {name +"  "+familyName}
            </p>
          </div>     
        </div>
        <div className="post-body">
          {
            (image == null || image === '')?<></>:
              <>
                <label htmlFor={"post-update-image-"+id}>
                  <img  src={image} alt="" />
                </label>
                <button type='button' className='btn btn-danger post-form__delete-image' onClick={()=>{setImage(''); setSrcImage('')}} >X</button>
              </>          
          }
          <input type="file" name="image" id={"post-update-image-"+id} onChange={(e)=>{onChangeImage(e)}} />

          <textarea className="post-form__content" name="" id={"post-update-content-"+id} placeholder='Quoi de neuf ?' onChange={onChangeContent} value={content} ></textarea>

        </div>

        <div className="form__footer">
          <label className='post-form__add-file' htmlFor={"post-update-image-"+id} >
              <img src={require('../../assets/img/image.png')} alt="" />
              {(image === '')?'ajoutter':'changer'}
          </label>
      
          <button type='button' className={`btn btn-primary ${disabled?'disabled':''}`}   onClick={() => onSubmit()} >Enregistrer</button>
          <button type='button' className="btn btn-warning" onClick={()=> cancel() } >Annuler</button>
        </div>
    
      </form>
    
    :<article className="post-card card">

      <div className="form__header">
        <div className="post-info">
          <div className="post-form__user">
            <img className="img-avatar" src={(avatar === '')?require('../../assets/img/avatar.png'):display(avatar)} alt="" />
            <p>
              {name +"  "+familyName}
            </p>
          </div>
        </div>
          
        { (userId !== user_id && !isAdmin )?<></>:
          <form className="post-action">
            <input type="checkbox" id={"post-action-"+id} />
            <label htmlFor={"post-action-"+id}>●●●</label>
            <ul className='card-option ' >
              { isAdmin?<></>:
              <li onClick={()=>{open(id)}} >
                <img src={require('../../assets/img/edit.png')} alt="icon-edit"  />
                Modifier
              </li>}

              <li onClick={()=>{postDelete(id, index)}} >
                <img src={require('../../assets/img/basket.png')} alt="icon-basket"  />
                Supprimer
              </li>
            </ul>
          </form>
        }
      </div>

      <div className="post-body">
        {(image !== '')?<img  src={image} alt="" />:<></>}
        <p>{content}</p>
      </div>

      <div className="post-footer">

        <ul className='info' >
          <Like id={id} userId={session.state.id} likes={likes} setLikes={setLikes} />
      
          <li>
            <span>Il y a {post.times(createdAt)}</span>
          </li>
        </ul>

        <div className="comments">
          <Comment session={session}  postID={id} />
        </div>

      </div>
    </article>
  )
}
