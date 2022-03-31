import React,{ useEffect, useState } from 'react'
import './assets/css/style.css';
import { Cookie } from './functions';

import  Router  from './Router';
import {verifyToken} from './functions';


export default function App() {


var session = {state:null, setState:null}; [session.state, session.setState] = useState({
  id: Cookie.get('id'),
  token: Cookie.get('token')
});

var master = {
  session: session
}
useEffect(()=>{
  verifyToken({master})
})
  return <Router master={master} />
}
