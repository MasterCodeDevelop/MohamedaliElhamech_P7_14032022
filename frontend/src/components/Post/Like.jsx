import React, {useEffect, useState} from 'react'
import post from '../../functions/post';

export default function Like({postID, userID}) {
    const [like, setLike] = useState(false),
    [likes, setLikes] = useState(null);

    useEffect(()=>{
        if (likes == null) post.getLikes({ postID, setLikes });
        else {
            const indexOf = likes.indexOf(userID)
            if(indexOf > -1 && like === false) {
                setLike(true);
            }else if(indexOf === -1 && like === true) {
                setLike(false);
            }
        }

    },[likes, like, userID, postID])
    const liked = () => {
        post.like(postID, () => {
            const indexOf = likes.indexOf(userID)
            if(indexOf > -1 ) {
               likes.splice(indexOf, 1);
               setLikes([...likes])
            }else {
                likes.push(userID);
                setLikes([...likes]) 
            }
        });
    }
    return (
        <li onClick={() => liked() } >
            <svg className={like?"icon active":"icon"} >
            <path d="M3,11h3v10H3V11z M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11v10h10.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z"></path>
            </svg>
            <span>{(likes == null)?0:likes.length}</span>
        </li>
    )
}