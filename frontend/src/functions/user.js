import Alert from "./Alert";
import Cookie from "./Cookie";

import { API_URL } from "../utils";
const regex = {
    name: /^[a-zA-Z ]{0,}$/i,
    password: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"),
    email: /^[a-zA-Z0-9.]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/i
}
const signup = (e) => {
    const familyName = e.target.querySelector('#signup-familyName').value;
    const name = e.target.querySelector('#signup-name').value;
    const email = e.target.querySelector('#signup-email').value;
    const password = e.target.querySelector('#signup-password').value;

    // vérifier le nom de famille 
    if( familyName == '') {
        return Alert.Danger('Vous devez saisir votre nom');
    } else if (!regex.name.test(familyName)) {
        return Alert.Danger('Votre nom est incorecte!');
    }

    // vérifier du prénom
    if( name == '') {
        return Alert.Danger('Vous devez saisir votre prénom');
    } else if (!regex.name.test(name)) {
        return Alert.Danger('Votre prénom est incorecte!');
    }

    // vérifier du email
    if( email == '') {
        return Alert.Danger('Vous devez saisir votre email');
    } else if (!regex.email.test(email)) {
        return Alert.Danger('Votre email est incorecte! Votre email doit être comme par exemple: nom.prenom@gmail.com');
    }

    // vérifier de mot de passe
    if( password == '') {
        return Alert.Danger('Vous devez saisir votre mot de passe')
    } else if (!regex.password.test(password)) {
        return Alert.Danger('Votre mot de passe est incorecte! Le mot de passe doit comporter 8 caractères ou plus dont 1 lettre minuscule et majuscule, 1 nombre et 1 caractère spécial');
    }

    fetch(API_URL+'/api/auth/signup', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            familyName,
            name,
            email,
            password
        })
      })
      .then((response) => response.json())
      .then((res) => {
        const { error, message } = res;
        if (error && message) return Alert.Danger(message);
        if (error && !message) return Alert.Danger('erreur, voir la console')
        if (!error) Alert.Success('Votre compte a été bien enregistrer');
        Cookie.set('token', res.token, 1);

        setTimeout(()=>{
            window.location.reload();
        },3000)
      })
      .catch((res)=>{ console.log(res) })
}   

const user = {
    signup
}
export default user;