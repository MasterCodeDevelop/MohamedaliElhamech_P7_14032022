function set(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  const Logout = () => {
    set('id','',0);
    set('token','',0);
    
    window.location.reload()
   
    
}

export default Logout;