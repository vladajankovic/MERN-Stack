import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

let idx = 0
let curtype = 'torta'


function Products() {

    let [productDB, setProductDB] = useState([])
    let [display, setDisplay] = useState(null)
    
    useEffect(() => {
        fetch("http://localhost:4000/products/all")
        .then(response => response.json())
        .then(result => {setProductDB(result)})
    }, [])
    
    let initCake = productDB.filter((item)=>item.type === curtype)
    let tmp = []
    for (let i = idx; i < 3 + idx && i < initCake.length; i++)
    {
        tmp.push(initCake[i])
    }
    display = tmp
    
    
    function showCakes(start:number, type:string) {
        curtype = type
        idx = start
        setDisplay([])
    }

    function productPage(item) {
        idx = 0
        curtype = 'torta'
        localStorage.setItem('product', JSON.stringify(item))
    }

    return (
        <div>
            <div className="select-type">
                <button className="select-type-button menu-item-1" onClick={()=>{showCakes(0, 'torta')}}>
                    Torte
                </button>
                <button className="select-type-button menu-item-2" onClick={()=>{showCakes(0, 'kolac')}}>
                    Kolači
                </button>
            </div>
            <div className="display-items">
                {display.map((item)=>{
                    return(
                        <Link to={'/store/product-page'} key={item._id} className="display-product" onClick={()=>productPage(item)}>
                            {item.name} <br />
                            <img src={item.image} alt="" width="400px" height="auto"/>
                        </Link>
                    )
                })}
            </div>
            <div className="pagination-bar">
                <div className="pagination">
                    <img className="div-hover" src="/images/icons/left2.png" alt="left" width='70px' height='70px' onClick={()=>{
                        for (let i = 0; i < 3; i++) {
                            if (idx > 0) idx -= 1
                            else break
                        }
                        showCakes(idx, curtype)
                    }}/>
                    <span style={{fontSize:'70px', marginTop:'-10px'}}>
                        {Math.ceil(idx/3) + 1}
                    </span>
                    <img className="div-hover" src="/images/icons/right2.png" alt="right" width='70px' height='70px' onClick={()=>{
                        let len = productDB.filter((item)=>item.type === curtype).length
                        for (let i = 0; i < 3; i++) {
                            if (idx + 3 < len) idx += 1
                            else break
                        }
                        showCakes(idx, curtype)
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default Products