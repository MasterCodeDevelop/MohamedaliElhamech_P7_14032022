import React, {useEffect} from 'react'

export default function Modal(props) {
    var modal = props.modal.state;
    const active = modal?" active":""

    useEffect(()=>{
        const html = document.querySelector('html');
        if(modal){
            html.style.overflowY = 'hidden'
        }else{
            html.style.overflowY = 'visible'
        }
    })
    return (
        <div className={"modal"+active}>
            <div className="modal__close" onClick={()=>{props.modal.setState(false)}}></div>
            <div className="modal__content">
                {props.children}
            </div>
        </div>
    )
}
