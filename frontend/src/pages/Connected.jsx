import React, { useState, useEffect } from 'react'
import validate from '../functions/validate';
import icon from '../assets/img/icon-above-font.svg'
export default function Connected({session}) {
    const [loader, setLoader] = useState(null);
    useEffect(()=>{
        if (loader == null) {
            setLoader(true);
            validate.token({session, setLoader})
        }
    },[loader, session])

    return (
        loader?<img className='image__loader' src={icon} alt="" />
        :<>
            errro
        </>
    )
}
