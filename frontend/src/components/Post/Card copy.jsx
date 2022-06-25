import React,{useState, useRef} from 'react'
import edit from '../../assets/img/edit.png';
import basket from '../../assets/img/basket.png';
import comment from '../../assets/img/comment.png';
import Comment from '../Comment/index';
import { API_URL } from '../../utils';
import Like from './Like';
import { post } from '../../functions';
export default function Card({dataItem,  session, index, openUpdate, update, postDelete}) {
  const { id, name, avatar,  familyName, createdAt, content, imageUrl } = dataItem;
  const [likes, setLikes] = useState(JSON.parse(dataItem.likes));
  const [openComment, setOpenComment] = useState(null)

  const open = ()=> {
    update.id.setState(index)
    update.open.setState(true);
    setTimeout(()=>{
      document.querySelector('#post-update-content').focus();
    },100)
  }
  return (
    <article className="post-card card">
      <div className="post-header">
        <div className="post-info">
            <img src={avatar} alt="" className="img-avatar" />
            <p >
                <strong>{name}  {familyName}</strong>
            </p>
        </div>
        <form className="post-action">
            <input type="checkbox" id={"post-action-"+id} />
            <label htmlFor={"post-action-"+id}>●●●</label>
            <ul className='card-option' >
                <li onClick={open} >
                    <img src={edit} alt=""  />
                    Modifier
                </li>
                <li onClick={()=>{postDelete(id, index)}} >
                    <img src={basket} alt=""  />
                    Supprimer
                </li>
            </ul>
        </form>
      </div>
      <div className="post-body">
        <p>{content}</p>
        <img 
          src={API_URL+imageUrl}
          alt=""
        />
      </div>
      <div className="post-footer">
        <ul className='info' >
          <li>
            <svg  viewBox="0 0 24 24" className={"liked"} ><path d="M3,11h3v10H3V11z M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11v10h10.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z"></path></svg>
            <span>
              {likes.length}
            </span>
          </li>
          <li>
            <p>10 Commentaires</p>
          </li>
        </ul>
        <ul className='info' >

          <Like id={id} userId={session.state.id} likes={likes} setLikes={setLikes} />
          <li onClick={()=>{setOpenComment(!openComment)}} >
            {/*<span className={like?"heart active":"heart"}></span>*/}
            <img className="icon" src={comment} alt="" />
            <span>Commenter</span>
          </li>
          <li>
            <svg className="icon" >
            <path d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z"></path>            </svg>
            <span>{post.times(createdAt)}</span>
          </li>
        </ul>
        <div className={`comments ${openComment?'active':''}`}>
          <Comment openComment={openComment} session={session} postID={id} />
        </div>
      </div>
    </article>
  )
}
