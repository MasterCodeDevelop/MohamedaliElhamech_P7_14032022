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
        <article className='comment' >
            <img src={(avatar === '')?require('../../assets/img/avatar.png'):display(avatar)} alt={`avatar-${name}`} className="img-avatar" />
            {change?
               <div className="comment__container edit">
                    <textarea value={content} onChange={onChangeContent} name="" id={'comment-content-'+id} className='comment-content' placeholder='Ecrivez un commentaire ...'></textarea>
                    <div className="comment__action">
                        <button type='button' className={`btn btn-primary ${disabled?'disabled':''}`} onClick={()=>{ comment.update({id, index, content, setChange, data}) }} >Envoyer</button>
                        <button type='button' className='btn btn-danger' onClick={cancel} >Annuler</button>
                    </div>
               </div>
            :<>
                <div className="comment__container">
                    <div className="comment__content">
                        <strong>{name}  {familyName}</strong>
                        <p>{content}</p>
                    </div>
                    <span>Il y a {post.times(createdAt)}</span>
                </div>
                {(userId !== user_id && userId !== post_userId && !isAdmin)?<></>:
                    <form className="comment__form-action">
                        <input type="checkbox" id={"comment-action-"+id} />
                        <label htmlFor={"comment-action-"+id}>●●●</label>
                        <ul className='comment__action__list' >
                            {
                                (userId !== user_id)?<></>
                                :<li className='comment__btn-action' onClick={()=> { setChange(true) }} >
                                    <img src={edit} alt=""  />
                                    Modifier
                                </li>
                            }
                            
                            <li className='comment__btn-action' onClick={()=>{ comment.delete({ id, index, data }) }} >
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
