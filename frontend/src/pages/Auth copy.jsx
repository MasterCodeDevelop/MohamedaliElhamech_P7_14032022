import React,{useState} from 'react'
import { Login, Signup, Modal, Background } from '../containers/index';
export default function Auth({session}) {
    var modal = {
        state: null,
        setState: null
    }; [modal.state, modal.setState] = useState(false);

    return (
        <div className="auth">
            <Modal modal={modal}>
                <Signup session={session} modal={modal}/>
            </Modal>
            <Login session={session} modal={modal} />
            <Background />
        </div>
    )

}
