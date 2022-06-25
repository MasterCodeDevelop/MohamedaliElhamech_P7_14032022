import React, {useState, useRef} from 'react'
import { post,  Alert } from '../../functions';
export default function Form({session, data, setData}) {

    const { name, familyName, avatar } = session.state,
    [content, setContent] = useState(''),
    [image, setImage] = useState(''),
    [sucess, setSucess] = useState(null)

    const [srcImage, setSrcImage] = useState('');
    const refImage = useRef();
    var modal = {
        state: null,
        setState: null
    }; [modal.state, modal.setState] = useState(false);

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
            modal.setState(false)
            setSucess(true)
            setTimeout(()=>{
                refImage.current.value =''
                setContent('')
                setImage('')
            },1000)
            Alert.Success('Votre article est publuè avec succé')
        })

    }
// nouveau article
return (
    <div className="post-form">
        <form className="card form" onSubmit={onSubmit}  >
            <div className="form-header">
                <h2>Créer une publication</h2>
                <div className="post-form__user">
                    <img className="post-form__avatar" src={(avatar == null)?require('../../assets/img/avatar.png'):avatar} alt="" />
                    <p>
                        {name +"  "+familyName}
                    </p>
                </div>
            </div>
            
            <div className="form__body">
                <div className="form-group">
                    <textarea className="post-form__content" name="" id="post-content" placeholder='Quoi de neuf ?' onChange={(e)=>{onChangeContent(e)}} value={content} ></textarea>
                </div>
                <div className="form-group post-form__file">
                    
                    {
                        (image == '')?<></>:
                        <>
                            <label htmlFor="post-form__image" className='post-form__image'>
                                <img  src={image} alt="" />
                            </label>
                            <div className="post-form__action">
                                test
                                <label htmlFor="post-form__image" className='btn' >Changer l'image</label>
                                <button type='button' className='btn btn-danger' onClick={()=>{setImage('')}} >X</button>
                            </div> 
                        </>
                    }
                        
                    <input ref={refImage} type="file" name="image" id="post-image" onChange={(e)=>{onChangeImage(e)}} />
                </div>
            </div>
            {(image != '')?<></>:
                <label className='add-file' htmlFor="post-image" >
                    Ajouter à votre publication
                    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></svg>
                </label>
            }
            <button className='btn btn-primary' type="submit">Publier</button>
            
        </form>
    </div>
)
/*
Bonsoir;

J'espère que je vos dirange pas.
Est-ce que vous pouvez me le valider aujourd'hui s'il vous plaît.
J'aimerais ne pas prendre du retard pour que je puisse passer le P7 bien avant la fin du moins.
Merci de votre compréhension.

Je vous souhaite une agréable soirée;
À très bientôt!


    return (
        <div className="post-form">
            <OverView modal={modal} />
            <Modal modal={modal} >
                <form className="card form" onSubmit={onSubmit}  >
                    <div className="form-header">
                        <h2>Créer une publication</h2>
                        <button type="button" onClick={()=>{modal.setState(false)}} className='btn btn-danger' >X</button>
                        <div className="post-form-user">
                            <img className="img-avatar" src="https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.6435-1/199673479_494669051794521_6202437076424504985_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=100&ccb=1-5&_nc_sid=7206a8&_nc_ohc=uTDgKXz2xBUAX8rlKSE&_nc_ht=scontent.fcdg1-1.fna&oh=00_AT-6eMGYCtM2zpW9b_W5IGRC_bVFX2k0-6Oi_jXHeg0Neg&oe=628BC35D" alt="" />
                            <p>
                                {user.name +"  "+user.familyName}
                            </p>
                        </div>
                    </div>
                    
                    <div className="form-body">
                        <div className="form-group content">
                            <textarea name="" id="post-content" placeholder='Quoi de neuf ?' onChange={(e)=>{onChangeContent(e)}} value={content} ></textarea>
                        </div>
                        <div className="form-group post-image">
                            
                            {
                                (image == '')?<></>:
                                <>
                                    <label htmlFor="post-image" className='post-image'><img  src={image} alt="" /></label>
                                    <div className="post-image-action">
                                        <label htmlFor="post-image" className='btn' >Changer l'image</label>
                                        <button type='button' className='btn btn-danger' onClick={()=>{setImage('')}} >X</button>
                                    </div> 
                                </>
                            }
                                
                            <input ref={refImage}  type="file" name="image" id="post-image" onChange={(e)=>{onChangeImage(e)}} />
                        </div>
                    </div>
                    {(image != '')?<></>:
                        <label className='add-file' htmlFor="post-image" >
                            Ajouter à votre publication
                            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></svg>
                        </label>
                    }
                    <button className='btn btn-primary' type="submit">Publier</button>
                    
                </form>
            </Modal>
        </div>
    )*/
}