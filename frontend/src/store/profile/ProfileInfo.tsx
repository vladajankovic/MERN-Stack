import { useNavigate } from "react-router-dom"

function ProfileInfo() {

    const user = JSON.parse(localStorage.getItem('loggedUser'))

    const navigator = useNavigate()

    function edit(path:string) {
        navigator(path)
    }
    
    return (
        <div className="profile-info">
                <div className="profile-data">
                    <div>
                        Ime:
                    </div>
                    <div>
                        {user.firstname}
                    </div>
                    <div>
                        Prezime:
                    </div>
                    <div>
                        {user.lastname}
                    </div>
                    <div>
                        Adresa:
                    </div>
                    <div>
                        {user.address}
                    </div>
                    <div>
                        Telefon:
                    </div>
                    <div>
                        {user.phone}
                    </div>
                </div>
                <div className="profile-edit">
                    <button className="edit-button" onClick={()=>edit('edit-password')}>Promeni lozinku</button>
                    <button className="edit-button" onClick={()=>edit('edit-info')}>Promeni lične podatke</button>
                </div>
            </div>
    )
}

export default ProfileInfo