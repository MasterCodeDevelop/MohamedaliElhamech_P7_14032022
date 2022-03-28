import React from 'react'
import { Cookie } from '../functions';

export default function Auth(props) {
    const cookieUser = {
        id: Cookie.get('id'),
        token: Cookie.get('token')
    }
/*
    console.log(cookieUser)
    if(master.user.state.id === undefined) {
        master.user.setState({
            id: '8',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2N…Q0NX0.gDMvTUGnYJI2IRKbFPK6mq8qQsCem8gYg3ImBBe5R6c'
        })
    }
*/
console.log(props.master.user.state.id)
if( props.master.user.state.id === undefined || props.master.user.state.id === '' ) {
    props.master.user.setState({
        id: '8',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2N…Q0NX0.gDMvTUGnYJI2IRKbFPK6mq8qQsCem8gYg3ImBBe5R6c'
    })
}
/*
if( master.user.state.id === undefined || master.user.state.id === '' ) {
    master.user.setState({
        id: '8',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2N…Q0NX0.gDMvTUGnYJI2IRKbFPK6mq8qQsCem8gYg3ImBBe5R6c'
    })
}*/
  return (
    <div>Auth</div>
  )
}
