import Alert from './Alert'
import auth from './auth';
import Cookie from './Cookie';
import user from './user';
import post from './post'
import comment from './comment';
import profile from './profile';
import { API_URL } from "../utils";

const display = (path) => {
    return API_URL+'/images/'+path;
}
const displayError = (res) => {
    const { error, message, logout} = res;
    
    if (error && logout) user.logout();
    else if ( error && message ) return Alert.Danger(message);
    else if ( error && !message ) {
        console.log(res);
        return Alert.Danger('erreur: voir la console')
    }
}

export {
    auth,
    display,
    displayError,
    Alert,
    Cookie, 
    user,
    post,
    comment,
    profile,
}