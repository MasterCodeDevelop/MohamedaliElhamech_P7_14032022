import { API_URL } from "../utils";
const display = (path) => {
    return API_URL+'/images/'+path;
}

export default display;