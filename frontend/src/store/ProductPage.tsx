import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css'

function ProductPage() {

    let cid = 0

    let product = JSON.parse(localStorage.getItem('product'))

    let [comments, setComments] = useState(product.comments)

    let [userComment, setUserComment] = useState("")
    let [amount, setAmount] = useState("")

    let validNumber = RegExp("^[1-9][0-9]*$")

    function addItem() {
        let item = {
            image: product.image,
            name: product.name,
            price: product.price,
            amount: parseInt(amount)
        }
        let cart : any = localStorage.getItem('cart')
        if (cart === null) {
            cart = [item]
        }
        else {
            cart = JSON.parse(cart)
            let found = false
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].name === item.name) {
                    cart[i].amount += item.amount
                    found = true
                    break
                }
            }
            if (!found) {
                cart.push(item)
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        setAmount("")
    }

    async function addComment() {
        let loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
        let newComment = {
            user: loggedUser.username, 
            message: userComment
        }
        product.comments.unshift(newComment)
        localStorage.setItem('product', JSON.stringify(product))

        let response = await fetch("http://localhost:4000/products/addComment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
        let result = await response.json()
        if (result.status === 200) {
            toast.success(
                <div style={{fontSize:'150%'}}>
                    Komentar uspešno dodat!
                </div>
                ,
                {
                    position:'top-center',
                    theme:'colored',
                    pauseOnHover: false,
                    autoClose:2000
                }
            )
            
            setUserComment("")
            setComments(product.comments)
        }
        else {
            console.log("Error adding comment!")
        }
    }

    return (
        <div className="product-back">
            <ToastContainer></ToastContainer>
            <div className="product-info">
                <img className="product-info-img" src={product.image} alt=""/>
                <div className="product-info-text">
                    <span>{product.name}</span> <br />
                    <hr />
                    Cena po komadu: <br />
                    {product.price} din <br />
                    <hr />
                    Unesite željenu <br /> 
                    količinu: <br />
                    <input type="text" size={20}style={{textAlign:'center', fontSize:'20px'}} 
                        onChange={(e)=>setAmount(e.target.value)} value={amount}/>
                    <br />
                    <button className="product-add-button" onClick={()=>{
                        if (!validNumber.test(amount)) {
                            toast.error(
                                <div style={{fontSize:'150%'}}>
                                    Greška!<br />
                                    Količina mora biti <br />
                                    ceo broj veći od 0!
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
                        toast.success(
                            <div style={{fontSize:'150%'}}>
                                Proizvod je dodat u korpu! <br />
                                {amount}x {product.name}
                            </div>
                            ,
                            {
                                position:'top-center',
                                theme:'colored',
                                pauseOnHover: false,
                                autoClose:2000
                            }
                        )
                        addItem()
                    }}>
                        Dodaj u korpu
                    </button>
                </div>
            </div>
            <div className="product-desc">
                Opis: <br />
                {product.description} <br />
                <br />
                Sastojci: <br />
                {product.ingredients}
            </div>
            <div className="product-comments">
                <textarea style={{fontSize:'20px', fontFamily:'Noto Sans'}} 
                    cols={100} rows={5} placeholder="Ostavite vaš komentar" 
                    onChange={(e)=>setUserComment(e.target.value)} value={userComment}></textarea>
                <br />
                <button className="product-add-button" onClick={()=>{
                    if (userComment.length === 0) {
                        toast.error(
                            <div style={{fontSize:'150%'}}>
                                Greška<br />
                                Pri dodavanju komentara!
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
                    
                    addComment()
                }}>
                    Dodaj komentar
                </button>
                {comments.map((comment)=>{
                    let id = cid
                    cid += 1
                    return (
                        <div className="comment" key={id}>
                            <img src="/images/icons/user1.png" alt="" width="50px" height="50px"/>
                            <div>
                                <b>{comment.user}</b> <br />
                                {comment.message}
                            </div>
                        </div>
                    )
                })}
            </div>
            <hr style={{color:'black', height:"50px", border:'none'}} />
        </div>
    )
}

export default ProductPage