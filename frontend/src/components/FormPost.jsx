import React, {useState} from 'react'
import { API_URL } from '../utils';
import axios from "axios";


const URL_API = API_URL+'/api/post/';

export default function FormPost({master}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const Ctrl_str = /[&\/\\#,+()$~%@^'!:*?<>{}]/g;
    const onSubmit = (e)=>{

        e.preventDefault();
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjQ4NjQ4ODU2LCJleHAiOjE2NDg3MzUyNTZ9.kiUZbJCbthRHE4_c3Dg8wwdyd8UkYYJ5Bh3H0uQG0FE"; 

        const authorization = JSON.stringify({
            id: 8,
            token: token
        })

        var formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        image && formData.append("image", image[0]);

        axios
        .post(URL_API, formData, {
          headers: {
            authorization: authorization,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((res)=>{ console.log(res) })


    }

    
    
    return (
        <form className='form-post' onSubmit={onSubmit} >
            
            <div className="form-group">
                <label htmlFor="title">Titre</label>
                <input value={title} onChange={(e)=>{setTitle(e.target.value.replace(Ctrl_str, ''))}} type="text" name="title" id="title" />
            </div>
    
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea value={description} onChange={(e)=>{setDescription(e.target.value.replace(Ctrl_str, ''))}} name="description" id="description" cols="30" rows="10"></textarea>
            </div>
    
            <div className="form-group row">
                <label htmlFor="image">
                    image
                    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></svg>
                </label>    
                <input type="file" name="image" id="image" onChange={(e)=>{setImage(e.target.files)}} />
                <button type="submit">Publier</button>
            </div>
        </form>
      )
    }
    