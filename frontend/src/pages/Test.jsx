import React from 'react'
import { API_URL } from '../utils';

const URL_API = API_URL+'/api/posts/';


export default function Test() {
  const id = 8;
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjQ4NjQ4ODU2LCJleHAiOjE2NDg3MzUyNTZ9.kiUZbJCbthRHE4_c3Dg8wwdyd8UkYYJ5Bh3H0uQG0FE"; 

  const onSubmit = (e) => {
    e.preventDefault();
      const authorization = JSON.stringify({
        id: 8,
        token: token
      })

      fetch('http://localhost:3000/api/post/1', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          authorization: authorization
        },
        body: JSON.stringify({
          data : {
            title: 'test',
            description: 'ugvdzfbzifbazofgbezh gzebvzj if f 4zg4z z 5z4 '
          }
        })
      })// or res.json()
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch(err => console.log(err))
/*
      fetch('http://localhost:3000/api/post/11', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          authorization: authorization
        }
      })// or res.json()
      .catch(err => console.log(err))
      */
      /*
      fetch("http://localhost:3000/api/post/10", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          authorization: authorization
        },
        method: "DELETE",
        body: JSON.stringify({
          data : {
            id: '10',
            title: 'test',
            description: 'ugvdzfbzifbazofgbezh gzebvzj if f 4zg4z z 5z4 '
          }
        })
      })
            .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((res)=>{ console.log(res) })
      */

    
  }

  return (
    <form onSubmit={onSubmit} >
        <input type="text" name="auth" id="auth" />
        <button>Go</button>
    </form>
  )
}
