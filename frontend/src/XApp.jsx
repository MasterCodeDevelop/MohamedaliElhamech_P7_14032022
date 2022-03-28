import React, {useState} from "react";

import './assets/css/style.css';

import { Cookie } from './functions';





export default function App() {



/*
  console.log( (master.user.state.id === undefined) )

    if( master.user.state.id === undefined || master.user.state.id === '' ) {
        master.user.setState({
            id: '8',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2N…Q0NX0.gDMvTUGnYJI2IRKbFPK6mq8qQsCem8gYg3ImBBe5R6c'
        })
    }
*/
const user = {
    id: Cookie.get('id'),
    token: Cookie.get('token')
}
console.log(user.token)
  return (
    <>
      HEllo
    </>
  )
}

