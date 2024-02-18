import { Outlet } from "react-router-dom"

function Profile() {

    const user = JSON.parse(localStorage.getItem('loggedUser'))

    const type = user.type === 'kupac' ? 'kupca' : 'zaposlenog'

    return (
        <div className="profile">
            <div style={{fontSize: '250%'}}>
                Profil {type} - {user.username} <br /><br />
            </div>
            <Outlet></Outlet>
        </div>
    )
}

export default Profile