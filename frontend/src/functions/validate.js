import Cookie from "./Cookie";
import { API_URL } from "../utils";

const token = ({session}) => {
    // token récupérer depuis la cookie
    const token= Cookie.get('token');

    // Si le token est vide alors on renvoie vers la page Auth
    if (token == '') session.setState(null);

}

const validate = {
    token
}

export default validate