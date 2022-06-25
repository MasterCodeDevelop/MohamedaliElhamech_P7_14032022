import Cookie from "./Cookie";
    const logout = () => {
        Cookie.set('token','',0);
        window.location.reload()  
    }

const auth = {
    logout
}
export default auth;