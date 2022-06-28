import { API_URL } from "../utils";
import { Alert, Cookie, displayError } from './index';

const authorization = `Bearer ${Cookie.get('token')}`


const times = (times) => {
    const newTimes = new Date().getTime();
    const defTimes = (newTimes - Number(times))/1000;

    if ( defTimes < 60*60 ) {
        
        if (defTimes < 60 ) return '0 minute';

        if (defTimes < 60*2 ) return '1 minute';

        return ` ${Math.floor(defTimes/60)} minutes`;
    }

    if ( defTimes < 60*60*24 ) {

        if (defTimes < 60*60 ) return '1 heure';

        return ` ${Math.floor(defTimes/(60*60))} heures`;
    }

    if ( defTimes < 60*60*24*2 ) return '1 jour';

    return ` ${Math.floor(defTimes/(60*60*24))} jours`;
}
const onChangeContentStyle = (e) => {
    const textarea = e.target;
    textarea.addEventListener("keyup", e => {
        textarea.style.height = "40px";
        let scHeight = e.target.scrollHeight;
        textarea.style.height = `${scHeight}px`
    })
}

const getAll = ({setData}) => {
    fetch(API_URL+'/api/post', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: authorization
        }
    })
    .then((response) => response.json())
    .then((res) => {
        displayError(res);
        if(!res.error) setData(res);
    })
    .catch(err => console.log(err))
}

const create = ({formData}, cb) => {
    fetch(API_URL+'/api/post', {
        method: "POST",
        headers: {
            authorization: authorization
        },
        body: formData
    })
    .then((response) => response.json())
    .then((res) => {
        displayError(res);
        if (res.data) {
            Alert.Success('Votre article est publuè avec succé');
            cb(res.data);
        }
        
    })
    .catch((res)=>{ console.log(res) })
}

const $delete = ({ id, index, data, setData }) => {
    
    fetch(API_URL+'/api/post/'+id, {
        method: "DELETE",
        headers: {
            authorization: authorization
        }
    })
    .then((response) => response.json())
    .then((res) => {
        displayError(res);
        if (!res.error) {
            data.splice(index,1);
            setData([...data])
            Alert.Success("post supprimée")
        }
        
    })
    .catch((res)=>{ console.log(res) })
}
    
const update = ({id, index, formData, data, setData, setEdit}, cb) => {
    fetch(API_URL+'/api/post/'+id, {
        method: "PUT",
        headers: {
            authorization: authorization
        },
        body: formData
    })
    .then((response) => response.json())
    .then((res) => {   
        displayError(res);
        if(!res.error){
            const newItem = res.data;
            data[index] = newItem;
            setData([...data])

            Alert.Success('Post modifiée');
            setEdit(false);
        }
    })
    .catch((res)=>{ console.log(res) })    
}

const getLikes = ({ postID, setLikes }) => {
    fetch(`${API_URL}/api/post/${postID}/like`, {
        method: "GET",
        headers: {
            authorization: authorization
        }
    })
    .then((response) => response.json())
    .then((res) => {   
        displayError(res);
        if (!res.error) {
            let likes = [];
            for (let i = 0; i < res.length; i++) {
                const like = res[i];
                likes.push(like.user_id)
            }
            setLikes(likes)
        }
    })
    .catch((res)=>{ console.log(res) })
}


const like = (postID, cb) => {
    fetch(`${API_URL}/api/post/${postID}/like`, {
        method: "POST",
        headers: {
            authorization: authorization
        }
    })
    .then((response) => response.json())
    .then((res) => {  
        displayError(res);
        if (!res.error) cb();
    })
    .catch((res)=>{ console.log(res) })
}








const post = {
    onChangeContentStyle,
    getAll,
    create,
    delete: $delete,
    update,
    getLikes,
    like,
    times
}
export default post