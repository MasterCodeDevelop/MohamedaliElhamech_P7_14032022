
const updateAlert = (message) => {
    const $alert = document.querySelector('.alert');
    const content = $alert.querySelector('p');
    content.textContent = message;
    $alert.classList.toggle('active')
    setTimeout(()=>{
        $alert.classList.toggle('active')
    },5000)
}
const Success = (message) => {
    const $alert = document.querySelector('.alert');
    $alert.classList.remove('alert-danger');
    $alert.classList.add('alert-success');
    updateAlert(message)
}
const Danger = (message) => {
    const $alert = document.querySelector('.alert');
    $alert.classList.remove('alert-success');
    $alert.classList.add('alert-danger');
    updateAlert(message)
}


const Alert = {
    Success,
    Danger
}
export default Alert