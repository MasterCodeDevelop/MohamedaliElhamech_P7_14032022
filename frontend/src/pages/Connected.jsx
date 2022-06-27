import React, { useEffect } from 'react'
import validate from '../functions/validate';
import icon from '../assets/img/icon-above-font.svg'
export default function Connected({session}) {
    useEffect(()=>{
        validate.token({session})
    })
    return (
        <img className='image__loader' src={icon} alt="" />
    )
}
