import React from 'react'
import { API_URL } from '../utils';


const URL_API = API_URL+'/api/sauces';
const onSubmit = (e)=>{
    e.preventDefault();

    fetch(URL_API, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({})
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
    })
    .catch((res)=>{ console.log(res) })
  
}
export default function FormPost() {
  return (
    <form className='form-post' onSubmit={onSubmit} >
        
        <div className="form-group">
            <label htmlFor="title">Titre</label>
            <input type="text" name="title" id="title" />
        </div>

        <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" cols="30" rows="10"></textarea>
        </div>

        <div className="form-group row">
            <label htmlFor="image">
                image
                <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></svg>
            </label>    
            <input type="file" name="image" id="image" />
            <button type="submit">Publier</button>
        </div>
    </form>
  )
}
