import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { Cookie } from '../functions';

export default function Redirect() {
    const navigate = useNavigate();

    const user = {
        id: Cookie.get('id'),
        token: Cookie.get('token')
    }

    useEffect(()=>{
        if(user.token === undefined || user.token === ''){
            navigate("/login")
        }else{
            navigate("/home")
        }
    })

  return (
    <>Error 404</>
  )
}
