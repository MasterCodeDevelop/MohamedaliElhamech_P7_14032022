import React, { useEffect } from 'react'
import validate from '../functions/validate';

export default function Connected({session}) {
    useEffect(()=>{
        validate.token({session})
    })
    return (
        <div>Connected</div>
    )
}
