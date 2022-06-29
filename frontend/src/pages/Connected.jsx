import React, { useEffect } from 'react'
import auth from '../functions/auth';
import icon from '../assets/img/icon-above-font.svg'
export default function Connected({session}) {
    useEffect(()=>{
        auth.token({session})
    },[session])
    return (
        <img className='image__loader' src={icon} alt="" />
    )
}
