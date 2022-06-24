import React from 'react'

export default function Alert() {
    return (
        <div className={`alert alert-success d-flex align-items-center`} id='alert' role="alert" >
            <p id='alert-content' ></p>
        </div>
    )
}
