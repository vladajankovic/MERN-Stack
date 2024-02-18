import { Link, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css'

import './Auth.css';
import { useState } from 'react';

function Register() {

    const navigator = useNavigate()

    const valid_password_characers = RegExp("^[a-zA-Z0-9~!@$%&*_\\-+=|\\:;<,>.?\\/]{8,}$")
    const contains_number = RegExp(".*[0-9].*")
    const contains_upper = RegExp(".*[A-Z].*")

    const valid_phone = RegExp("^(06|\\+3816)[0-9]{7,8}$")

    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [firstname, setFirstname] = useState("")
    let [lastname, setLastname] = useState("")
    let [address, setAddress] = useState("")
    let [phone, setPhone] = useState("")

    async function register() {
        if (username.length === 0 || password.length === 0 ||
            firstname.length === 0 || lastname.length === 0 ||
            address.length === 0 || phone.length === 0) {
                toast.error(
                    <div>
                        <span>Greška!</span><br />
                        <span>Niste uneli sve podatke!</span>
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

        let response = await fetch("http://localhost:4000/users/findUser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username})
        })
        let result = await response.json()

        if (result.count > 0) {
            toast.error(
                <div>
                    <span>Greška!</span><br />
                    <span>Korisničko ime je zauzeto!</span>
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

        let test_password = valid_password_characers.test(password) && 
            contains_number.test(password) && contains_upper.test(password)
        if (!test_password) {
            toast.error(
                <div>
                    <span>Greška!</span><br />
                    <span>Loš format lozinke!</span>
                </div>
                ,
                {
                    position:'top-center',
                    theme:'colored',
                    pauseOnHover: false,
                    autoClose:5000
                }
            )
            if (!valid_password_characers.test(password)){
                toast.error(
                    <div>
                        <ul>
                            <li>Najmanje 8 karaktera</li>
                            <li>Dozvoljeni karakteri <br />a-z A-Z 0-9 <br /> ~!@$%&*_-+=|\:;{'<'},{'>'}.?/</li>
                        </ul>
                    </div>
                    ,
                    {
                        position:'top-center',
                        theme:'colored',
                        pauseOnHover: false,
                        autoClose:5000
                    }
                )
            }
            if (!contains_number.test(password)){
                toast.error(
                    <div>
                        <ul>
                            <li>Najmanje 1 cifra</li>
                        </ul>
                    </div>
                    ,
                    {
                        position:'top-center',
                        theme:'colored',
                        pauseOnHover: false,
                        autoClose:5000
                    }
                )
            }
            if (!contains_upper.test(password)){
                toast.error(
                    <div>
                        <ul>
                            <li>Najmanje 1 veliko slovo</li>
                        </ul>
                    </div>
                    ,
                    {
                        position:'top-center',
                        theme:'colored',
                        pauseOnHover: false,
                        autoClose:5000
                    }
                )
            }
            return
        }

        if (!valid_phone.test(phone))
        {
            toast.error(
                <div>
                    <span>Greška!</span><br />
                    <span>Loš format broja telefona!</span><br />
                    <p>Dozvoljeni formati:</p>
                    <ul>
                        <li>+3816XXXXXXXX</li>
                        <li>+3816XXXXXXX</li>
                        <li>06XXXXXXXX</li>
                        <li>06XXXXXXX</li>
                    </ul>
                </div>
                ,
                {
                    position:'top-center',
                    theme:'colored',
                    pauseOnHover: false,
                    autoClose:5000
                }
            )
            return
        }

        let newUser = {
            type: "kupac",
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            address: address,
            phone: phone,
        }

        response = await fetch("http://localhost:4000/users/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })

        result = await response.json()
        
        if (result.status === 200) {
            toast.success(
                <div>
                    <span>Registracija je uspešna!</span><br />
                    <p>Bićete uskoro vraćeni na stranicu za prijavljivanje.</p>
                </div>
                ,
                {
                    position:'top-center',
                    theme:'colored',
                    pauseOnHover: false,
                    autoClose:2000
                }
            )
    
            setTimeout(() => navigator('/login'), 3000)
        }
        else {
            toast.error(
                <div>
                    <span>Registracija je neuspešna!</span><br />
                    <p>Greška u bazi podataka.</p>
                </div>
                ,
                {
                    position:'top-center',
                    theme:'colored',
                    pauseOnHover: false,
                    autoClose:2000
                }
            )
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
                <h2 className='form-head-font'>Registrujte se</h2>
                <div className='form-grid'>
                    <div>
                        <span>Korisničko ime</span><br />
                        <input type="text" onChange={(e)=>{setUsername(e.target.value)}} size={30}/>
                    </div>
                    <div>
                        <span>Lozinka</span><br />
                        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} size={30}/>
                    </div>
                    <div>
                        <span>Ime</span><br />
                        <input type="text" onChange={(e)=>{setFirstname(e.target.value)}} size={30}/>
                    </div>
                    <div>
                        <span>Prezime</span><br />
                        <input type="text" onChange={(e)=>{setLastname(e.target.value)}} size={30}/>
                    </div>
                    <div>
                        <span>Broj telefona</span><br />
                        <input type="text" onChange={(e)=>{setPhone(e.target.value)}} size={30}/>
                    </div>
                    <div>
                        <span>Adresa</span><br />
                        <input type="text" onChange={(e)=>{setAddress(e.target.value)}} size={30}/>
                    </div>
                </div>
                <button onClick={register} className='form-button'>REGISTRACIJA</button>
                <br /><br /><br />
                <span className='form-font'>
                    Imate korisnički nalog? <Link to='/login' className='auth-link'>Prijavite se</Link>
                </span>
                <br /><br />
            </div>
        </div>
    )
}


export default Register;