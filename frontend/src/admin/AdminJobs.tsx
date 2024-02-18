import {Link} from 'react-router-dom'


function AdminJobs() {
    return (
        <div className='admin-jobs'>
            <div>
                <Link to={'/admin/new-product'}>
                    <div className='job-item'>
                        Dodaj proizvod
                    </div>
                </Link>
            </div>
            <div>
                <Link to={'/admin/orders'}>
                    <div className='job-item'>
                        Pregled narudžbina
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default AdminJobs