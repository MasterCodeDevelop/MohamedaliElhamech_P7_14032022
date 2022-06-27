import React,{useState} from 'react'
import { Login, Signup } from '../containers/index';
export default function Auth() {

    const [active, setActive] = useState(false)
   
    return (
        <section className={`auth ${active?'active':''}`} >
            <Login setActive={setActive} />
            <Signup setActive={setActive} />
        </section>
    )

}
