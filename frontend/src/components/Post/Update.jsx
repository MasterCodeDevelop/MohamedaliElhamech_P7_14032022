import React, {useState, useEffect} from 'react'
import Modal from '../../containers/Modal'
import post from '../../functions/post';
import { API_URL } from '../../utils';

export default function Form({session, data, setData, modal, update}) {
    var index = update.id.state;
    const user = session.state;
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [srcImage, setSrcImage] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [item, setItem] = useState(null);
    const onChangeImage = (e) => {
        const newImage = e.target.files
        setSrcImage(newImage);
        let reader = new FileReader()
        reader.readAsDataURL(newImage[0])
        reader.onload = ()=>{
            setImage(reader.result)
        }
    }
    const onChangeContent = (e) => {
        setContent(e.target.value)
        post.onChangeContentStyle(e)
    }
    const onSubmit = (e)=>{
        e.preventDefault();

        var formData = new FormData();
        formData.append("id", item.id);
        if (content != item.content){ 
            formData.append("content", content);
        }
        if (image != API_URL+item.imageUrl) {
            if(image == '') {
                formData.append("image", null);
            } else {
                srcImage && formData.append("image", srcImage[0]);
            }
        }

        post.update({index, formData, data, setData, modal})

    }
    useEffect(()=>{ 
        setContent('');
        setImage('');
        if(index != null) {
            setItem(data[index])
            const Data = data[index];
            setContent(Data.content);
            if (Data.imageUrl != null) setImage('http://localhost:3000'+Data.imageUrl);
        }
    },[index]);
    
    useEffect(()=>{
        if(item != null) {
            if( image != API_URL+item.imageUrl || content != item.content) {
                setDisabled(false)
            }else {
                setDisabled(true)
            }
        }
    },[image, content])
    return (
        <Modal modal={modal} >
            <form className="post-form" onSubmit={onSubmit} >
                <div className="card">
                    <div className="post-form__header">
                        <button type="button" onClick={()=>{modal.setState(false)}} className='btn btn-danger' >X</button>
                        <div className="post-form-user">
                            <img className="img-avatar" src={require('../../assets/img/avatar.png')} alt="" />
                            <p>
                                {user.name +"  "+user.familyName}
                            </p>
                        </div>
                    </div>
                    <div className="form__body">
                        <div className="form__group post-image">
                            
                            <input type="file" name="image" id={"post-update-image"+index} onChange={(e)=>{onChangeImage(e)}} />

                            {(image == '')?<></>:
                                <>
                                    <label htmlFor={"post-update-image"+index}><img className='img' src={image} alt="" /></label>  
                                    <div className="post-image-action">
                                        <label htmlFor="post-update-image" className='btn' >Changer l'image</label>
                                        <button type='button' className='btn btn-danger' onClick={()=>{setImage('')}} >X</button>
                                    </div>
                                </>
                            }
                                
                        </div>
                        <div className="form__group">
                            <textarea className='post-form__content' name="" id="post-update-content" placeholder='Quoi de neuf ?' onChange={(e)=>{onChangeContent(e)}} value={content} ></textarea>
                        </div>
                    </div>
                    {(image != '' )?<></>:
                        <label className='add-file' htmlFor="post-update-image" >
                            Ajouter à votre publication
                            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></svg>
                        </label>
                    }
                    <button className={disabled?'btn btn-primary disabled':'btn btn-primary'} type="submit">Publier</button>

                </div>
            </form>
        </Modal>
    )
}