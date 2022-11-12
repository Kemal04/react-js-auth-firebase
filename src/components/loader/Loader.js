import React from 'react'
import loader from "../../assets/loader.gif"
import ReactDOM from "react-dom"

const Loader = () => {
    return ReactDOM.createPortal(
        <div className='position-absolute' style={{ top: "40%", left: "40%" }}>
            <img src={loader} className="img-fluid" alt='Loader' />
        </div>,
        document.getElementById("loader")
    )
}

export default Loader