import React, {useState} from 'react'
import './assets/css/style.css'
import Alert from './components/Alert';

import Router from './Router'

export default function App() {
    var session = {state:null, setState:null}; [session.state, session.setState] = useState(undefined);

    return (
        <>
            <Router session={session} />
            <Alert/>
        </>    
    )
}
