import Cookie from "./Cookie";




const Logout = () => {
    Cookie.set('id','',0);
    Cookie.set('token','',0);
    
    window.location.reload()
}

const verifyToken = ({master}) => {
    const cookie = {
        id: Cookie.get('id'),
        token: Cookie.get('token')
    }
    if(cookie.id === undefined || cookie.id === '' || cookie.token === undefined || cookie.token ===''){
        if(master.session.state !== null) {
            master.session.setState(null)
        }
    }
}




export {
    Cookie,
    Logout,
    verifyToken
}