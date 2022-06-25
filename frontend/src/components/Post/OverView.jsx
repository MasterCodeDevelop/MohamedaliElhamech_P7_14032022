import React from 'react'
import imgPost from '../../assets/img/post.png'

export default function OverView({modal}) {
    const open = () => {
        modal.setState(true);
        setTimeout(() => {
            document.getElementById('post-content').focus();
        }, 1000);
    }

    return (
        <div className="form-overview card">
            <label htmlFor='post-content' onClick={open}>
                <img src={imgPost} alt="" />
                <p>
                    <span>Créer un post</span>
                    <span>Partagez une photo ou un message</span>
                </p>
            </label>
        </div>
    )
}
