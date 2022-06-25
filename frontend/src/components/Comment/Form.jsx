import React,{ useState, useEffect } from 'react'
import { post, comment } from '../../functions';

export default function Form({postID, data, setData, session}) {
  const { avatar } = session.state;
  const [content, setContent] = useState('')
  const [disabled, setDisabled] = useState('disabled');
  const onChangeContent = (e) => {
    //setContent(e.target.value.replace(Ctrl_str, ''))
    setContent(e.target.value)
    post.onChangeContentStyle(e)
  }
  const onSubmit = () => {
    comment.create({postID, content, data, setContent})
  }
  useEffect(()=>{
    if (content == '' && disabled != 'disabled') {
      setDisabled('disabled');
    } else if (content != '' && disabled != '') {
      setDisabled('');
    }
  },[content, disabled])
  return (
    <div className="comment-form">
        <img src={(avatar==null)?require('../../assets/img/avatar.png'):avatar} alt="" className="img-avatar" />
        <textarea value={content} onChange={onChangeContent} name="" id="post-comment-content" placeholder='Ecrivez un commentaire ...'></textarea>
        <button onClick={()=>{ onSubmit() }} className={`btn btn-primary ${disabled}`} >Envoyer</button>
    </div>
  )
}
