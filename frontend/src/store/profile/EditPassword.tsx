import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";

function EditPassword() {

    const navigator = useNavigate()

    const user = JSON.parse(localStorage.getItem('loggedUser'))

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const valid_password_characers = RegExp("^[a-zA-Z0-9~!@$%&*_\\-+=|\\:;<,>.?\\/]{8,}$")
    const contains_number = RegExp(".*[0-9].*")
    const contains_upper = RegExp(".*[A-Z].*")

    function changePassword() {
        if (user.password !== oldPassword) {
            toast.error(
                <div style={{fontSize:'150%'}}>
                    Greška!<br />
                    Nesipravno uneta stara lozinka!
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

        if (user.password === newPassword) {
            toast.error(
                <div style={{fontSize:'150%'}}>
                    Greška!<br />
                    Nova lozinka mora biti drugačija od stare lozinke!
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

        let test_password = valid_password_characers.test(newPassword) && 
            contains_number.test(newPassword) && contains_upper.test(newPassword)
        if (!test_password) {
            toast.error(
                <div style={{fontSize:'150%'}}>
                    Greška!<br />
                    Loš format nove lozinke!
                </div>
                ,
                {
                    position:'top-center',
                    theme:'colored',
                    pauseOnHover: false,
                    autoClose:5000
                }
            )
            if (!valid_password_characers.test(newPassword)){
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
            if (!contains_number.test(newPassword)){
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
            if (!contains_upper.test(newPassword)){
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

        if (newPassword !== confirmPassword) {
            toast.error(
                <div style={{fontSize:'150%'}}>
                    Greška!<br />
                    Morate potvrditi novu loziknu!
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

        let userDB = JSON.parse(localStorage.getItem('userDB'))
        for (let i = 0; i < userDB.length; i++)
        {
            if (user.username === userDB[i].username) {
                userDB[i].password = newPassword
                localStorage.setItem('userDB', JSON.stringify(userDB))
                break
            }
        }

        user.password = newPassword
        localStorage.setItem('loggedUser', JSON.stringify(user))

        toast.success(
            <div style={{fontSize:'150%'}}>
                Promena lozinke je uspešna!<br />
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
        <>
            <ToastContainer></ToastContainer>
            <div className="edit-pass">
                <div className="edit-pass-fields">
                    <div>
                        <div>Stara lozinka</div>
                        <input type='password' size={30} onChange={(e)=>setOldPassword(e.target.value)}/>
                    </div>
                    <div>
                        <div>Nova lozinka</div>
                        <input type='password' size={30} onChange={(e)=>setNewPassword(e.target.value)}/>
                    </div>
                    <div>
                        <div>Potvrda nove lozinke</div>
                        <input type='password' size={30} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="edit-pass-change">
                    <button className="edit-pass-button" onClick={changePassword}>Promeni lozinku</button>
                </div>
            </div>
        </>
    )
}

export default EditPassword