import Cookie from "./Cookie";
import { API_URL } from "../utils";
import { Alert } from './index';

const authorization = `Bearer ${Cookie.get('token')}`


const create = ({postID, content, data, setContent}) => {
    const URL = API_URL+'/api/post/comment/'+postID;
    const body = {
        content: content
    }
    fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type':'application/json',
            authorization: authorization
        },
        body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((res) => {
        const { error, message } = res;

        if (error && message) return Alert.Danger(res.message);
        if (error && !message) {
            return Alert('erreur voir la console');
        }

        let newData = data.state;
        newData.push(res.data);
        data.setState([...newData]);
        setContent('');
        Alert.Success('Commentaire postulé !');
        
    })
    .catch(err => console.log(err))
}
const getAll = ({postID, data}) => {
    const URL = API_URL+'/api/post/comments/'+postID;
    fetch(URL, {
        method: "GET",
        headers: {
            'Content-Type':'application/json',
            authorization: authorization
        }
    })
    .then((response) => response.json())
    .then((res) => {
        const { error, message } = res;
        if (error && message ) return Alert.Danger(message);
        if (error && !message) {
            console.log(res)
            return Alert.Danger('erreur voir la console')
        }
        data.setState(res.data)
        
    })
    .catch(err => console.log(err))
}
const get = (id) => {
    console.log(id)
}

const update = ({id, content, setChange, data, index}) => {
    const URL = API_URL+'/api/post/comment/'+id;
    const body = { content };
    fetch(URL, {
        method: "PUT",
        headers: {
            'Content-Type':'application/json',
            authorization: authorization
        },
        body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((res) => {
        const { error, message } = res;
        if (error && message ) return Alert.Danger(message);
        if (error && !message) {
            console.log(res)
            return Alert.Danger('erreur voir la console')
        }
        let newData = data.state;  
        newData[index].content = content;
        data.setState([...newData]);
        setChange(false);
          
    })
    .catch(err => console.log(err))
}


const $delete = ({ id, index, data}) => {
    fetch(API_URL+'/api/post/comment/'+id, {
        method: "DELETE",
        headers: {
            authorization: authorization
        }
    })
    .then((response) => response.json())
    .then((res) => {
        if (!res.error) {
            let newData = data.state;
            newData.splice(index,1);
            data.setState([...newData]);
            Alert.Success('Commentaire suprimée')
        }   
    })
}


const comment = {
    create,
    get,
    getAll,
    update,
    delete: $delete
}
export default comment