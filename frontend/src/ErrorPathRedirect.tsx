import image from './error404.png'

function Error404() {
    
    return (
        <div>
            <div style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                marginTop:"-143px",
                marginLeft:"-343px"
            }}>
                <img src={image} alt=""/>
            </div>
        </div>
        
    )
}

export default Error404