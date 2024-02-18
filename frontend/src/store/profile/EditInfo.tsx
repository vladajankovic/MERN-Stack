import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";


function EditInfo() {

    const navigator = useNavigate()

    const user = JSON.parse(localStorage.getItem('loggedUser'))

    const [firstname, setFirstname] = useState(user.firstname)
    const [lastname, setLastname] = useState(user.lastname)
    const [phone, setPhone] = useState(user.phone)
    const [address, setAddress] = useState(user.address)

    const valid_phone = RegExp("^(06|\\+3816)[0-9]{7,8}$")

    function updateInfo() {
        if (firstname.length === 0 || lastname.length === 0 ||
            phone.length === 0 || address.length === 0) {
                toast.error(
                    <div style={{fontSize:'150%'}}>
                        Greška!<br />
                        Sva polja mora da se popune!
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

        if (!valid_phone.test(phone)) {
            toast.error(
                <div style={{fontSize:'150%'}}>
                    Greška!<br />
                    Loš format broja telefona!<br />
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

        user.firstname = firstname
        user.lastname = lastname
        user.phone = phone
        user.address = address

        let userDB = JSON.parse(localStorage.getItem('userDB'))
        for (let i = 0; i < userDB.length; i++) {
            if (user.username === userDB[i].username) {
                userDB[i] = user
                localStorage.setItem('userDB', JSON.stringify(userDB))
            }
        }

        localStorage.setItem('loggedUser', JSON.stringify(user))

        toast.success(
            <div style={{fontSize:'150%'}}>
                Lićni podaci su ažurirani!<br />
                <p>Bićete uskoro vraćeni na profilnu stranicu.</p>
            </div>
            ,
            {
                position:'top-center',
                theme:'colored',
                pauseOnHover: false,
                autoClose:2000
            }
        )

        if (user.type === 'kupac') {
            setTimeout(() => navigator('/store/profile'), 3000)
        }
        else {
            setTimeout(() => navigator('/admin/profile'), 3000)
        }
    }

    return (
        <div>
            <ToastContainer></ToastContainer>
            <div className="edit-info-grid">
                <div>
                    Ime <br />
                    <input type="text" size={25} value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
                </div>
                <div>
                    Prezime <br />
                    <input type="text" size={25} value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
                </div>
                <div>
                    Broj telefona <br />
                    <input type="text" size={25} value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                </div>
                <div>
                    Adresa <br />
                    <input type="text" size={25} value={address} onChange={(e)=>setAddress(e.target.value)}/>
                </div>
            </div>
            <button className="edit-info-button" onClick={updateInfo}>Promeni lične podatke</button>
        </div>
    )
}

export default EditInfo