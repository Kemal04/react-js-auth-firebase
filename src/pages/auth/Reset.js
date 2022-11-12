import { sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import loginImg from '../../assets/login.svg'
import Loader from '../../components/loader/Loader'
import { auth } from "../../firebase/config.js"

const Reset = () => {

    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState("")

    const navigate = useNavigate();

    const resetPassword = (e) => {
        e.preventDefault();
        setIsLoading(true)

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false)
                toast.success("Check your Email")
                navigate("/")
            })
            .catch((error) => {
                setIsLoading(false)
                toast.error(error.message)
            });
    }

    return (
        <>
        {isLoading && <Loader/>}
            <div className='container my-5 py-3'>
                <div className='row align-items-center justify-content-around'>

                    <div className='col-lg-4'>
                        <form onSubmit={resetPassword} className='card p-3 shadow border-0 '>
                            <div className="mb-3 h2 text-center text-dark">
                                Reset
                            </div>
                            <div className="mb-3">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Email address" />
                            </div>
                            <div className="d-grid mb-1">
                                <button type="submit" className="btn btn-primary">Reset</button>
                            </div>
                            <div className='text-center mb-1 d-flex align-items-center justify-content-between'>
                                <Link to="/login" className='nav-link'>Login</Link>
                                <Link to="/register" className='nav-link'>Register</Link>
                            </div>
                        </form>
                    </div>
                    <div className='col-lg-6'>
                        <img alt='' src={loginImg} className="img-fluid" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reset