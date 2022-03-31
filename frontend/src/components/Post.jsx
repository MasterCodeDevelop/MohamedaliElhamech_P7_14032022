import React from 'react'

export default function Post() {
  return (
    <article className="post">

        <div className="post__info-container">
            <img src="https://th.bing.com/th/id/R.032fbd51b52c47e0ca8ba73dce98e53c?rik=%2buJFcaAIN2A0DQ&pid=ImgRaw&r=0" alt="" className="post__avatar" />
            <p>first name</p>
            <p>lastName</p>
        </div>
        <figure className="post__figure" >
            <img 
                src="https://res.cloudinary.com/css-tricks/image/fetch/w_1200,q_auto,f_auto/https://css-tricks.com/wp-content/uploads/2018/08/react-events.png"
                alt=""
                className="post__image"
            />
            <figcaption>title</figcaption>
            <p className="post__date">14 mars 2022</p>
        </figure>

        <div className="post__buttons">
            <button onClick={()=>{alert('supprimer')}} >suprimer</button>
            <button onClick={()=>{alert('like')}} >J'aime</button>
        </div>

    </article>
  )
}
