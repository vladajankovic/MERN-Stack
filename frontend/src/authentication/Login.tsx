import { Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css'

import './Auth.css';

function Login() {

    useEffect(() => {
        localStorage.removeItem('loggedUser')
    })

    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")

    const navigator = useNavigate()

    async function login() {

        const response = await fetch("http://localhost:4000/users/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        })
        const user = await response.json()

        if (user.length === 0) {
            toast.error(
                <div>
                    <span>Greška!</span><br />
                    <span>Neispravno korisničko</span><br />
                    <span>ime ili lozinka!</span>
                </div>
                , 
                {
                    position:'top-center', 
                    theme:'colored',
                    pauseOnHover: false,
                    autoClose:2000
                }
            )
            return
        }

        let loggedUser = user[0]

        localStorage.setItem("loggedUser", JSON.stringify(loggedUser))
        if (loggedUser.type === 'admin') {
            navigator('/admin')
        }
        else {
            navigator('/store')
        }
    }
    

    return (
        <div className='auth-back'>
            <ToastContainer></ToastContainer>
            <div className='auth-header'>
                Poslastičarnica " Slatki Zalogaji "
            </div>
            <div className='form-body'>
                <br />
                <h2 className='form-head-font'>Prijavite se</h2>
                <br />
                <span className='form-font'>Korisničko ime</span>
                <br />
                <input type="text" onChange={(e)=>{setUsername(e.target.value)}} size={30}/>
                <br /><br />
                <span className='form-font'>Lozinka</span>
                <br />
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} size={30}/>
                <br /><br /><br />
                <button onClick={login} className='form-button'>PRIJAVA</button>
                <br /><br /><br /><br />
                <span className='form-font'>
                    Nemate korisnički nalog? <Link to='/register' className='auth-link'>Registujte se</Link>
                </span>
                <br /><br />
            </div>
        </div>
    );
}

export default Login;