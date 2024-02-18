import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css'

function AddNewProduct() {

    let sid = 0

    let navigator = useNavigate()

    let images = [
        '/images/products/cannoli-desert.png',
        '/images/products/čoko-mafini.png',
        '/images/products/čoko-trešnjica.png',
        '/images/products/kupina-štrudlice.png',
        '/images/products/divlji-kolači.png',
        '/images/products/cinnamon-cups.png'
    ]

    let [displayImg, setDisplayImg] = useState(images[0])

    let [name, setName] = useState("")
    let [price, setPrice] = useState("")
    let [description, setDescription] = useState("")
    let [ingredients, setIngredients] = useState("")
    let [type, setType] = useState('torta')

    function changeImage(url:string) {
        (document.getElementById("prod-img") as HTMLImageElement).src = url
    }

    async function addToDatabase() {
        if (name.length === 0 || price.length === 0 || description.length === 0 || ingredients.length === 0) {
            toast.error(
                <div style={{fontSize:'150%'}}>
                    Greška! <br />
                    Niste popunili sva polja u formi.
                </div>,
                {
                    theme:'colored',
                    position:'top-center',
                    pauseOnHover: false,
                    autoClose:2000
                }
            )
            return
        }

        let validNumber = RegExp("^[1-9][0-9]*$")
        if (!validNumber.test(price)) {
            toast.error(
                <div style={{fontSize:'150%'}}>
                    Greška! <br />
                    Cena mora biti pozitivan ceo broj.
                </div>,
                {
                    theme:'colored',
                    position:'top-center',
                    pauseOnHover: false,
                    autoClose:2000
                }
            )
            return
        }

        let newProduct = {
            type: type,
            name: name,
            image: displayImg,
            description: description,
            price: parseInt(price),
            ingredients:ingredients,
            comments:[]
        }

        let response = await fetch("http://localhost:4000/products/newProduct", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        let result = await response.json()

        if (result.status === 200) {
            toast.success(
                <div style={{fontSize:'150%'}}>
                    Proizvod dodat u prodavnicu. <br />
                    Povratak na glavnu stranicu...
                </div>,
                {
                    theme:'colored',
                    position:'top-center',
                    pauseOnHover: false,
                    autoClose:2000
                }
            )
            setTimeout(() => navigator('/admin'), 3000)
        }
        else {
            toast.error(
                <div style={{fontSize:'150%'}}>
                    Greška dodavanja proizvoda u bazu!
                </div>,
                {
                    theme:'colored',
                    position:'top-center',
                    pauseOnHover: false,
                    autoClose:2000
                }
            )
        }
    }

    return (
        <div className="blank-background">
            <ToastContainer></ToastContainer>
            <div style={{position:'relative', top:'50px'}}>
                <div className="new-img-item">
                    <img id="prod-img" src={displayImg} alt="" width="500px" height='auto' style={{marginLeft:'70px', border:'2px solid'}}/>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', columnGap:'50px'}}>
                        <div>
                            <div style={{textAlign:'left', fontSize:'20px'}}>
                                Naziv <br />
                                <input type="text" size={37} style={{textAlign:'left', fontSize:'17px'}} value={name} onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <br /><br />
                            <div style={{textAlign:'left', fontSize:'20px'}}>
                                Opis <br />
                                <textarea cols={40} rows={5} 
                                    style={{fontFamily:'Noto Sans', fontSize:'17px',resize:'none', padding:"5px"}} 
                                    value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div>
                            <div style={{textAlign:'left', fontSize:'20px'}}>
                                Cena <br />
                                <input type="text" size={37} style={{textAlign:'left', fontSize:'17px'}} value={price} onChange={(e)=>setPrice(e.target.value)}/>
                            </div>
                            <br /><br />
                            <div style={{textAlign:'left', fontSize:'20px'}}>
                                Sastav <br />
                                <textarea cols={40} rows={5} 
                                    style={{fontFamily:'Noto Sans', fontSize:'17px',resize:'none', padding:"5px"}}
                                    value={ingredients} onChange={(e)=>setIngredients(e.target.value)}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="select-image">
                        {images.map((image)=>{
                            let id = sid
                            sid += 1
                            return (
                                <div key={id}>
                                    <img src={image} style={{border:'2px solid'}} alt="" width='150px' height='auto' onClick={()=>{
                                        changeImage(image)
                                        setDisplayImg(image)
                                    }}/>
                                </div>
                            )
                        })}
                    </div>
                    <div style={{display:'flex', alignItems:'center', flexDirection:'column', rowGap:'20px'}}>
                        <div style={{display:'flex', columnGap:'100px'}}>
                        <label className="container" onClick={()=>setType('torta')}>Torta
                            <input type="radio" defaultChecked name="radio"/>
                            <span className="checkmark"></span>
                        </label>
                        <label className="container" onClick={()=>setType('kolac')}>Kolač
                            <input type="radio" name="radio"/>
                            <span className="checkmark"></span>
                        </label>
                        </div>
                        <button className="button-new-add" onClick={addToDatabase}>Dodaj proizvod</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewProduct