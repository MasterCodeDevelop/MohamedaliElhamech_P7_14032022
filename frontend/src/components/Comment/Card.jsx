import React,{ useEffect, useState } from 'react'
import edit from '../../assets/img/edit.png';
import basket from '../../assets/img/basket.png';
import { post, comment, display } from '../../functions';

export default function Card({ dataItem, data, index, session }) {
    const { id, user_id, post_userId, name, familyName, avatar,  createdAt} = dataItem;
    const{ id:userId, isAdmin }= session.state;
    const [change, setChange] = useState(false);
    const [content, setContent] = useState(dataItem.content)
    const [disabled, setDisabled] = useState(false);
    const onChangeContent = (e) => {
        //setContent(e.target.value.replace(Ctrl_str, ''))
        setContent(e.target.value)
        post.onChangeContentStyle(e)
      }

      const cancel = () => {
          if(content !== dataItem.content) { setContent(dataItem.content) };
            setChange(false);
      }
      useEffect(()=>{
        if(content !== dataItem.content && disabled === true) {
            setDisabled(false);
        }else if(content === dataItem.content && disabled === false) {
            setDisabled(true);
        }
      },[content, disabled, dataItem.content])
      
      return (
        <article className='comment-card' >
            <img src={(avatar === '')?require('../../assets/img/avatar.png'):display(avatar)} alt={`avatar-${name}`} className="img-avatar" />
            {change?
                <>
                    <textarea value={content} onChange={onChangeContent} name="" id={'comment-content-'+id} className='comment-content' placeholder='Ecrivez un commentaire ...'></textarea>
                    <div className="comment-change-action">
                        <button type='button' className={`btn btn-primary ${disabled?'disabled':''}`} onClick={()=>{ comment.update({id, index, content, setChange, data}) }} >Envoyer</button>
                        <button type='button' className='btn btn-danger' onClick={cancel} >Annuler</button>
                    </div>
                </>
            :<>
                <div className="comment-container">
                    <p className="comment-user">
                        <strong>{name}  {familyName}</strong>
                        {post.times(createdAt)}
                    </p>   
                    
                    <p className='comment-content' >
                        {content}
                    </p>
                </div>
                {(userId !== user_id && userId !== post_userId && !isAdmin)?<></>:
                    <form className="post-action">
                        <input type="checkbox" id={"post-action-"+id} />
                        <label htmlFor={"post-action-"+id}>●●●</label>
                        <ul className='post__action__list' >
                            {
                                (userId !== user_id)?<></>
                                :<li onClick={()=> { setChange(true) }} >
                                    <img src={edit} alt=""  />
                                    Modifier
                                </li>
                            }
                            
                            <li onClick={()=>{ comment.delete({ id, index, data }) }} >
                                <img src={basket} alt=""  />
                                Supprimer
                            </li>
                        </ul>
                    </form>
                }
            </>}
        </article>
    )
}
