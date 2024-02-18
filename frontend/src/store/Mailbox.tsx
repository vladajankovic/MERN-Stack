import { useEffect, useState } from "react"


function Mailbox() {

    let sid = 0

    let [notifications, setNotifications] = useState(null)
    
    useEffect(() => {
        fetch("http://localhost:4000/orders/userOrders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: localStorage.getItem('loggedUser')
        })
        .then(response => response.json())
        .then(result => setNotifications(result.reverse()))
    }, [])

    if (notifications === null) {
        return (
            <div className="mailbox-back">
                <div className="mailbox-header">
                    Obaveštenja
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="mailbox-back">
                <div className="mailbox-header">
                    Obaveštenja
                </div>
                <div className="mailbox-back scroll-notif">
                    {notifications.map((notif)=>{
                        let id = sid
                        sid += 1
    
                        let orders = ""
                        for (let i = 0; i < notif.order.length; i++) {
                            orders += "" + notif.order[i].amount + "x " + notif.order[i].name + ", "
                        }
                        orders = orders.slice(0, -2)
    
                        let state = "pending"
                        if (notif.status === "Odobreno") {state = 'accepted'}
                        if (notif.status === "Odbijeno") {state = 'rejected'}
    
                        return (
                            <div key={id} className={state}>
                                <div>
                                    Status: {notif.status}
                                </div>
                                <div>
                                    Narudžbina: {orders}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
    
    
    
}

export default Mailbox