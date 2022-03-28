import { Cookie } from '../functions';

export default function verifyToken({master}) {

    const id = Cookie.get('id');
    const token = Cookie.get('token');
    console.log(id);
    console.log(token);
    if( (id=="" || id == undefined) || (token=="" || token == undefined) ) {
        console.log('error: file => verifyToken l-9 ');
    }else{
        master.user.setState({
            id: id,
            token: token
        })
    }
}
