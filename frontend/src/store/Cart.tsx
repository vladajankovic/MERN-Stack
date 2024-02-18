import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css'

function Cart() {

    let sid = 0

    let [userCart, setCart] = useState(localStorage.getItem('cart'))
    let cart:any = userCart

    let total = 0

    function removeItem(item) {
        let newCart = []
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name !== item.name) {
                newCart.push(cart[i])
            }
        }
        localStorage.setItem('cart', JSON.stringify(newCart))
        toast.error(
            <div style={{fontSize:'150%'}}>
                Uklonjeno iz korpe: <br />
                {item.amount}x {item.name}
            </div>,
            {
                position:'top-center',
                theme:'colored',
                pauseOnHover: false,
                autoClose:2000
            }
        )
        setCart(localStorage.getItem('cart'))
    }

    async function placeOrder() {
        let user = JSON.parse(localStorage.getItem('loggedUser'))

        let newOrder = {
            id: 0,
            user: user.username,
            order: cart,
            status:'Na čekanju'
        }

        let response = await fetch("http://localhost:4000/orders/newOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newOrder)
        })
        let result = await response.json()

        if (result.status === 200) {
            toast.success(
                <div style={{fontSize:'150%'}}>
                    Narudžbina se obrađuje! <br />
                    Čeka se odobrenje zaposlenog.
                </div>,
                {
                    position:'top-center',
                    theme:'colored',
                    pauseOnHover: false,
                    autoClose:2000
                }
            )
            localStorage.removeItem('cart')
            setCart(null)
        }
        else {
            toast.error(
                <div style={{fontSize:'150%'}}>
                    Greška pri naručivanju!
                </div>,
                {
                    position:'top-center',
                    theme:'colored',
                    pauseOnHover: false,
                    autoClose:2000
                }
            )
        }
    }

    if (cart === null) {
        return (
            <div className="empty-cart" style={{display:"flex", flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                <ToastContainer></ToastContainer>
                <span style={{fontFamily:'Kurale', fontSize:"40px"}}>Vaša korpa je trenutno prazna.</span> <br />
                <img src="/images/icons/cartempty.png" alt="" width="150px" height="150px"/>
            </div>
        )
    }
    else {
        cart = JSON.parse(cart)
        if (cart.length === 0) {
            return (
                <div className="empty-cart" style={{display:"flex", flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                    <ToastContainer></ToastContainer>
                    <span style={{fontFamily:'Kurale', fontSize:"40px"}}>Vaša korpa je trenutno prazna.</span> <br />
                    <img src="/images/icons/cartempty.png" alt="" width="150px" height="150px"/>
                </div>
            )
        }
        
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].amount * parseInt(cart[i].price)
        }
        return (
            <div className="cart">
                <ToastContainer></ToastContainer>
                <div className="cart-header">
                    <span>Proizvod</span>
                    <span>Cena</span>
                    <span>Količina</span>
                </div>
                <hr style={{backgroundColor:"black", height:'3px', border:'none'}}/>
                <div className="cart-items" >
                    {cart.map((item)=>{
                        let id = sid
                        sid += 1
                        return (
                            <div className="cart-item-image" key={id}>
                                <img src={item.image} alt="" width="200px" height="auto" style={{border:"solid 2px"}}/>
                                <div className="cart-item">
                                    <span className="cart-item-text" style={{marginRight:'100px'}}>{item.name}</span>
                                    <span className="cart-item-text">{item.price} din</span>
                                    <span className="cart-item-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.amount}</span>
                                    <span style={{paddingRight:'100px'}}>
                                        <img className="div-hover" src="/images/icons/cross.png" alt="" width='50px' height='50px' onClick={()=>{
                                            removeItem(item)
                                        }}/>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <hr style={{backgroundColor:"black", height:'3px', border:'none'}}/>
                <div className="cart-order">
                    <span className="cart-item-text">Ukupan iznos: {total} din</span>
                    <button className="cart-button" onClick={() => {
                        placeOrder()
                    }}>Naruči</button>
                </div>
            </div>
        )
    }
}

export default Cart