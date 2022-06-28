import Cookie from "./Cookie";
import { API_URL } from "../utils";

const token = ({session, setLoader}) => {
    // token récupérer depuis la cookie
    const token= Cookie.get('token');

    // Si le token est vide alors on renvoie vers la page Auth
    if (token == '') { 
        session.setState(null);
        setLoader(false)
    } else {
        const authorization = `Bearer ${token}`;
        fetch(API_URL+'/api/auth', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: authorization
            }
            
        })
        .then((response) => {
            console.log(response);
            if (response.status === 404) {
                setLoader(false)
            } else {
                response.json()
            }
        })
        .then((res) => {
            /*const { error, user } = res;
            if ( error ) {
                Cookie.set('token','', 1);
                setTimeout(()=>{
                    session.setState(null)
                },2000)
            } else {
                setTimeout(()=>{
                    session.setState(user)
                },2000)
            }*/
        })
        .catch(err => {
            /*console.log(err)*/
        })
    }

}

const validate = {
    token
}

export default validate