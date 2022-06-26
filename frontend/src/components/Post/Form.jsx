import React, {useState, useRef} from 'react'
import { useEffect } from 'react';
import { post,  Alert } from '../../functions';
export default function Form({session, data, setData}) {

    const { name, familyName, avatar } = session.state,
    [content, setContent] = useState(''),
    [image, setImage] = useState(''),
    [disabled, setDisabled] = useState('disabled')
    const [srcImage, setSrcImage] = useState('');
    const refImage = useRef();

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
        formData.append("content", content);
        srcImage && formData.append("image", srcImage[0]);
        post.create({formData, data, setData}, () =>{
            refImage.current.value =''
            setContent('')
            setImage('')
            Alert.Success('Votre article est publuè avec succé')
        })

    }
    useEffect(()=>{
        if (content == '' && image == '' && disabled == '') {
            setDisabled('disabled')
        } else if ( ( content != '' || image != '' )  && disabled == 'disabled') {
            setDisabled('')
        }
    },[content, image, disabled])
    
    // nouvel article
    return (
        <div className="post-form">
            <form className="card form" onSubmit={onSubmit}  >
                <div className="form__header">
                    <div className="post-form__user">
                        <img className="post-form__avatar" src={(avatar == null)?require('../../assets/img/avatar.png'):avatar} alt="" />
                        <p>
                            {name +"  "+familyName}
                        </p>
                    </div>
                </div>
                
                <div className="form__body">
                    <div className="form__group">
                        {(image == '')?<></>:
                            <>
                                <label htmlFor="post-image" >
                                    <img className='post-form__image' src={image} alt="" />
                                </label>
                                <button type='button' className='btn btn-danger post-form__delete-image' onClick={()=>{setImage(''); setSrcImage('')}} >X</button>
                            </>
                        }
                        <input ref={refImage} type="file" name="image" id="post-image" onChange={(e)=>{onChangeImage(e)}} />
                    </div>
                    <div className="form__group">
                        <textarea className="post-form__content" name="" id="post-content" placeholder='Quoi de neuf ?' onChange={(e)=>{onChangeContent(e)}} value={content} ></textarea>
                    </div>
                </div>
                <div className="form__footer">
                    <label className='post-form__add-file' htmlFor="post-image" >
                        <img src={require('../../assets/img/image.png')} alt="" />
                        {(image == '')?'ajoutter':'changer'}
                    </label>
                
                    <button className={`btn btn-primary ${disabled}`} type="submit">Publier</button>
                </div>

                
            </form>
        </div>
    )
}