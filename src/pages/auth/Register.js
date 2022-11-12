import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../../assets/login.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/config.js"
import Loader from "../../components/loader/Loader.js"

const Register = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [isLoading, setIsLoading] = useState("")

    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault();

        if (password !== cPassword) {
            toast.error("Password do not match !")
        }
        setIsLoading(true)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setIsLoading(false)
                toast.success("Register Success")
                navigate("/login")
            })
            .catch((error) => {
                toast.error(error.message)
                setIsLoading(false)
            });
    }

    return (
        <>
            <ToastContainer />
            {isLoading && <Loader />}
            <div className='container my-5 py-3'>
                <div className='row align-items-center justify-content-around'>

                    <div className='col-lg-4'>
                        <form onSubmit={registerUser} className='card p-3 shadow border-0'>

                            <div className="mb-3 h2 text-center text-dark">
                                Register
                            </div>

                            <div className="mb-3">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Email address" />
                            </div>

                            <div className="mb-3">
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password" />
                            </div>

                            <div className="mb-3">
                                <input value={cPassword} onChange={(e) => setCPassword(e.target.value)} type="password" className="form-control" placeholder="Confirim Password" />
                            </div>

                            <div className="d-grid mb-1">
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>

                            <div className='text-center mb-1 d-flex align-items-center justify-content-center'>
                                Already an account ?<Link to="/login" className='nav-link'>Login</Link>
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

export default Register