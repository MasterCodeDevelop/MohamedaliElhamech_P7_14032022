import { Cookie } from '../functions';
import { Outlet } from "react-router-dom";

export default function Auth({master, setUser, stateUser}) {

    const id = Cookie.get('id');
    const token = Cookie.get('token');
    const user = master.user.state;
    
    if( (id=="" || id == undefined) || (token=="" || token == undefined) ) {
        console.log('error: file => verifyToken l-9 ');
    }else{
        //if( (user.id=="" || user.id == undefined) || (user.token=="" || user.token == undefined) ) {
       if(stateUser.id == undefined){
            /*master.user.setState({
                id: id,
                token: token
            })*/
            /*setUser({
                api: 8,
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDg0NzUwNDUsImV4cCI6MTY0ODU2MTQ0NX0.gDMvTUGnYJI2IRKbFPK6mq8qQsCem8gYg3ImBBe5R6c"
            })*/
            console.log(stateUser)
        }
        
    }

    return <>Hello</>
}
