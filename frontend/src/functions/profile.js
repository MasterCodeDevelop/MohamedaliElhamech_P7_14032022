import { API_URL } from "../utils";
import Cookie from "./Cookie";
import Alert from "./Alert";
const authorization = `Bearer ${Cookie.get('token')}`,
RegPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

const getAll = ({setData}) => {
    fetch(API_URL+'/api/post/user', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: authorization
        }
    })
    .then((response) => response.json())
    .then((res) => {
      if(!res.error) {
          setData(res.data)
      }
    })
    .catch(err => console.log(err))
}
const updateProfil = ({e, session, closeModal, data}) => {
    const familyName = e.target.querySelector('#familyName'),
    name = e.target.querySelector('#name'),
    poste = e.target.querySelector('#poste');
    var body = {};
    const sessionData = session.state;
    if (familyName.value != '') {
        body['familyName'] = familyName.value;
        sessionData.familyName = familyName.value;
    }

    if (name.value != '') {
        body['name'] = name.value;
        sessionData.name = name.value;
    }

    if (poste.value != '') {
        body['poste'] = poste.value;
        sessionData.poste = poste.value;
    }

    fetch(API_URL+'/api/auth/user/profil', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: authorization
        },
        body: JSON.stringify(body)
    })
    .then((response) =>  response.json() )
    .then((res) => {
        if (!res.error) {
            session.setState(sessionData)
            closeModal()
            getAll({setData: data.setState});
        }
    })
    .catch(err => console.log(err))
}

const updatePassword = ({e, modal}) => {
    e.preventDefault(); 
    const password = e.target.querySelector('#password').value,
    newPassword = e.target.querySelector('#new-password').value;

    if (password == '' || newPassword =='') {
      Alert.Danger('veillez remplir tous les champs')
    } else if ( !RegPass.test(newPassword) ) {
      Alert.Danger('voitre nouveau mot de pass doit comporter 8 caractères ou plus dont 1 lettre minuscule et majuscule, 1 nombre et 1 caractère spécial')
    }
    const body = {
        password: password.value,
        newPassword: newPassword.value
    };
    
    fetch(API_URL+'/api/auth/user/password', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: authorization
        },
        body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((res) => {
        console.log(res)
        const { error, message } = res;
        if (error && message) return Alert.Danger(message);
        if (error && !message) return Alert.Danger('erreur, voir la console')
        Alert.Success('Votre mot de passe a été modifier avec succés');
        modal.setState(false);
        password.value = '';
        password.value = '';

    })
    .catch(err => console.log(err))
}
const deleteCompte = ({e, modal}) => {
    e.preventDefault();
    const password = e.target.querySelector('#password').value;
    

    fetch(API_URL+'/api/auth/user', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: authorization
        },
        body: JSON.stringify({password})
    })
    .then((response) => response.json())
    .then((res) => {
        console.log(res)
        const { error, message } = res;
        if (error && message) return Alert.Danger(message);
        if (error && !message) return Alert.Danger('erreur, voir la console')
        Alert.Success('Votre compte est supprimé');
        modal.setState(false);

        // suprimé la valeur du token
        Cookie.set('token', '', 1);

        // rafraichir la page après 3 secondes
        setTimeout(()=>{
            window.location.reload();
        }, 3000)

    })
    .catch(err => console.log(err))}
const profile = {
    getAll,
    updateProfil,
    updatePassword,
    deleteCompte
}

export default profile;