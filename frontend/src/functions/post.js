import Cookie from "./Cookie";
import { API_URL } from "../utils";
import { Alert } from './index';

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
    .then((data) => {
      setData(data)
    })
    .catch(err => console.log(err))
}

const create = ({formData, data, setData}, cb) => {
    fetch(API_URL+'/api/post', {
        method: "POST",
        headers: {
            authorization: authorization
        },
        body: formData
    })
    .then((response) => response.json())
    .then((res) => {
        if (res.error) {
            Alert.Danger(res.message)
        } else {
            cb()
            const newData = data;
            newData.push(res.data)
            setData([...newData])
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
        const { error, message } = res;
        if (error && message) return Alert.Danger(message);
        if (error && !message) return Alert.Danger('erreur, voir la console')

        let newData = data;
        newData.splice(index,1);
        setData([...newData])
        Alert.Success("post supprimée")
        
    })
    .catch((res)=>{ console.log(res) })
}
    
const update = ({index, formData, data, setData, setEdit}) => {
    fetch(API_URL+'/api/post', {
        method: "PUT",
        headers: {
            authorization: authorization
        },
        body: formData
    })
    .then((response) => response.json())
    .then((res) => {   
        if(res.error){
            Alert.Danger(res.message)
        } else {
            
            const newItem = res.data;
            let newData = data;
            
            if (newItem.content != undefined && newData[index].content != newItem.content) {
                newData[index].content = newItem.content;
            }
            
            if (newItem.imageUrl != '' && newData[index].imageUrl != newItem.imageUrl) {
                newData[index].imageUrl = newItem.imageUrl;
            }
            setData([...newData])
            Alert.Success('Post modifiée');
            setEdit(false);
        }
    })
    .catch((res)=>{ console.log(res) })    
}

const like = ({id, setLikes}, cb) => {
    fetch(`${API_URL}/api/post/${id}/like`, {
        method: "POST",
        headers: {
            authorization: authorization
        }
    })
    .then((response) => response.json())
    .then((res) => {   
        const likes = res.data;
        setLikes([...likes])
    })
    .catch((res)=>{ console.log(res) })
}

const post = {
    onChangeContentStyle,
    getAll,
    create,
    delete: $delete,
    update,
    like,
    times
}
export default post