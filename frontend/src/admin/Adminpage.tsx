import {Outlet, Link, useNavigate} from 'react-router-dom'

import { useEffect } from 'react'

import './Admin.css'

function Adminpage() {

    const navigator = useNavigate()

    const userExists = localStorage.getItem('loggedUser')

    useEffect(() => {
        if (userExists == null) {
            navigator('/')
        }
    })

    
    function logout() {
        localStorage.removeItem('loggedUser')
    }

    return (
        <div className='admin-background'>
            <Link to={''}>
                <div className='main-header'>
                    Poslastičarnica " Slatki Zalogaji "
                </div>
            </Link>
            <div className='admin-menu'>
                <div>
                    <img src='/images/icons/user2.png' alt="profil" width='50' height='50'/>
                    <Link to={'profile'}>
                        <div className='item menu-item-1'>
                            Profil
                        </div>
                    </Link>
                </div>
                <div>
                    <img src='/images/icons/logout2.png' alt="odjava" width='50' height='50'/>
                    <Link to={'/'} onClick={logout}>
                        <div className='item menu-item-2'>
                            Odjava
                        </div>
                    </Link>
                </div>
            </div>
            <hr color='black' className='line'/>
            <div className="cover-back">
                <Outlet/>
            </div>
        </div>
    )
}

export default Adminpage