import { useEffect, useState } from "react"


function ApproveOrders() {

    let [displayOrders, setDisplayOrders] = useState([])

    useEffect(() => {
        fetch("http://localhost:4000/orders/pendingOrders")
        .then(response => response.json())
        .then(result => setDisplayOrders(result.reverse()))
    }, [])

    if (displayOrders.length === 0) {
        return (
            <div className="blank-background" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <div style={{fontFamily:'Kurale', fontSize:'40px'}}>
                    Nema novih zahteva za odobravanje narudžbine.
                </div>
            </div>
        )
    }

    async function HandleOrder(order, status:string) {
        let data = {
            order: order,
            status: status
        }

        let response = await fetch("http://localhost:4000/orders/setStatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        let result = await response.json()

        if (result.status === 200) {
            fetch("http://localhost:4000/orders/pendingOrders")
            .then(response => response.json())
            .then(result => setDisplayOrders(result.reverse()))
        }
        else {
            console.log("Error handling order in database!")
        }
    }

    return (
        <div className="blank-background order-back">
            {displayOrders.map((order) => {
                return (
                    <div className="order-request" key={order.id}>
                        <div>
                            Kupac: {order.user} <br />
                            Narudžbina: 
                            <ul style={{margin:"0px"}}> 
                                {order.order.map((item) => {
                                    return (
                                        <li>
                                            {item.amount}x {item.name}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="order-action">
                            <img className="div-hover" src="/images/icons/check.png" alt="" width="70px" height="70px" onClick={() => {
                                HandleOrder(order, "Odobreno")
                            }}/>
                            <img className="div-hover" src="/images/icons/cross.png" alt="" width="70px" height="70px" onClick={() => {
                                HandleOrder(order, "Odbijeno")
                            }}/>
                        </div>
                    </div>
                )
            })}
            <hr />
        </div>
    )
}

export default ApproveOrders