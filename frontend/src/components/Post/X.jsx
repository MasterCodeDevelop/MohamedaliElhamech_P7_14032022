import React, {useState, useRef, useEffect} from 'react'

import { API_URL } from '../../utils';
const URL_API = API_URL+'/api/post';
export default function New({modal, session}) {

    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [sucess, setSucess] = useState(null)
    const Ctrl_str = /[&\/\\#,+()$~%@^'!:*?<>{}]/g;
    const [srcImage, setSrcImage] = useState('');
    const refImage = useRef();
    const user = session.state;



    const onChangeImage = (e) => {
        const newImage = e.target.files
        setSrcImage(newImage);
        let reader = new FileReader()
        reader.readAsDataURL(newImage[0])
        reader.onload = ()=>{
            setImage(reader.result)
        }
    }

    const onSubmit = (e)=>{

        e.preventDefault();


        const authorization = JSON.stringify({
            id: user.id,
            token: user.token
        })

        var formData = new FormData();
        formData.append("description", description);

        srcImage && formData.append("image", srcImage[0]);

        fetch(URL_API, formData, {
          headers: {
            authorization: authorization,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        .then((json) => {
            /*
            const res = json.data;

            if(res.message == "post created"){
                const newData = master.home.state;

                
                newData.push(res.data)
                master.home.setState([...newData])
                modal.setState(false)
                setSucess(true)
                
                setTimeout(()=>{
                    refImage.current.value =''
                    //setDescription('')
                    setImage('')
                },1000)
                setTimeout(()=>{
                    setSucess(null)
                },3000)
            }*/
        })
        .catch((res)=>{ console.log(res) })


    }
    return (
        <form className="card post-form" onSubmit={onSubmit} >
            <div className="form-header">
                <h2>Créer une publication</h2>
                <img src={user.avatar} alt="" />
                <p>
                    <span>{user.firstName +"  "+user.lastName}</span>
                    <span>Tout le monde</span>
                </p>
            </div>
            <div className="form-body">
                <div className="form-group description">
                    
                    {
                        //<textarea value={description} onChange={(e)=>{setDescription(e.target.value.replace(Ctrl_str, ''))}} name="description" id="post-description"  cols="30" rows="10"></textarea>
                    }
                    <textarea name="" id="post-description" placeholder='Quoi de neuf ?' onChange={(e)=>{setDescription(e.target.value.replace(Ctrl_str, ''))}} value={description} ></textarea>
                </div>
                <div className="form-group image">
                    <label htmlFor="post-image">
                        {
                            (image == '')?<><svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></svg> Choisir une image</>
                            :<img className='img' src={image} alt="" />
                        }
                        <span>Changer l'image</span>
                    </label>    
                    <input ref={refImage}  type="file" name="image" id="post-image" onChange={(e)=>{onChangeImage(e)}} />
                </div>
            </div>
            
            <button className='btn btn-primary' type="submit">Publier</button>

        </form>
    )
    
}
