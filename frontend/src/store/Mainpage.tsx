import {Outlet, Link, useNavigate} from 'react-router-dom'

import './Store.css'
import { useEffect } from 'react'

function Mainpage() {

    const navigator = useNavigate()

    const userExists = localStorage.getItem('loggedUser')

    useEffect(() => {
        if (userExists == null) {
            navigator('/')
        }
    })

    
    function logout() {
        localStorage.removeItem('loggedUser')
        localStorage.removeItem('product')
        localStorage.removeItem('cart')
    }

    return (
        <div className='main-background'>
            <Link to={''}>
                <div className='main-header'>
                    Poslastičarnica " Slatki Zalogaji "
                </div>
            </Link>
            <div className='main-menu'>
                <div className='icon'>
                        <img src='/images/icons/promo.png' alt="promo" width='50' height='50'/>
                    </div>
                <div className='icon'>
                    <img src='/images/icons/cake2.png' alt="proizvod" width='50' height='50'/>
                </div>
                <div className='icon'>
                    <img src='/images/icons/cart.png' alt="korpa" width='50' height='50'/>
                </div>
                <div className='icon'>
                    <img src='/images/icons/phone.png' alt="kontakt" width='50' height='50'/>
                </div>
                <div className=''>
                    <img src='/images/icons/user2.png' alt="profil" width='50' height='50'/>
                </div>
                <div className='icon'>
                    <img src='/images/icons/logout2.png' alt="odjava" width='50' height='50'/>   
                </div>
                <Link to={'promo'}>
                    <div className='menu-item-1 l-edge'>
                        Promocije
                    </div>
                </Link>
                <Link to={'all-products'}>
                    <div className='menu-item-2 b-edge'>
                        Proizvodi
                    </div>
                </Link>
                <Link to={'cart'}>
                    <div className='menu-item-1 b-edge'>
                        Korpa
                    </div>
                </Link>
                <Link to={'contact'}>
                    <div className='menu-item-2 b-edge'>
                        Kontakt
                    </div>
                </Link>
                <Link to={'profile'}>
                    <div className='menu-item-1 b-edge'>
                        Profil
                    </div>
                </Link>
                <Link to={'/'} onClick={logout}>
                    <div className='menu-item-2 b-edge r-edge'>
                        Odjava
                    </div>
                </Link>
                <Link to={'notifications'}>
                    <img className='mailbox' src="/images/icons/mailbox.png" alt=""/>
                </Link>
            </div>
            <div className="cover-back">
                <Outlet/>
            </div>
        </div>
    )
}

export default Mainpage