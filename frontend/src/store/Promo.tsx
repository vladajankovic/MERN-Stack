import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


function Promo() {

    const navigator = useNavigate()

    const timerRef = useRef(null)
    const delay = 5000

    function stopTimer() {
        clearTimeout(timerRef.current)
    }

    useEffect(()=>{
        slideshow(0)

        return () => {
            stopTimer()
        }
    })

    let galery = [
        '/images/products/promo/plava-princeza.png', 
        '/images/products/promo/čokoladna-simfonija.png', 
        '/images/products/promo/kralj-lešnika.png'
    ]
    let promoImage = galery[0]

    async function productPage() {
        let productImg = promoImage.replace("promo/", "")

        let response = await fetch("http://localhost:4000/products/findProduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({productImg: productImg})
        })
        let result = await response.json()
        
        if (result.length > 0) {
            let product = result[0]
            localStorage.setItem('product', JSON.stringify(product))
            navigator('/store/product-page')
        }
        else {
            console.log("Error! Promo product not in database!")
        }
    }

    function changeImage(idx:number) {
        promoImage = galery[idx];
        (document.getElementById('image') as HTMLImageElement).src = promoImage

        let dots = document.getElementsByClassName('dot')
        for (let i = 0; i < dots.length; i++)
        {
            dots[i].className = dots[i].className.replace(" active-dot", "")
        }
        dots[idx].className = dots[idx].className + " active-dot"
    }

    function slideshow(id:number) {
        stopTimer()
        changeImage(id)
        id = (id + 1) % galery.length
        timerRef.current = setTimeout(()=>{
            slideshow(id)
        }, delay)
    }

    return (
        <div>
            <hr color="black" style={{margin:"-5px 0 0 0"}} className="promo-line"/>
            <div className="div-hover">
                <img id='image' className='crop-image' src={promoImage} alt="" width='100%' onClick={productPage}/>
            </div>
            <div className="galery-dots">
                <div className="dot active-dot" onClick={()=>slideshow(0)}></div>
                <div className="dot" onClick={()=>slideshow(1)}></div>
                <div className="dot" onClick={()=>slideshow(2)}></div>
            </div>
            <hr color="black" style={{margin:"-6px 0 0 0"}} className="promo-line"/>
            
        </div>
    )
}

export default Promo