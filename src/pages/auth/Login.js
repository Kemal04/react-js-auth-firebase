import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../../assets/login.svg'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config.js"
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState("")

    const navigate = useNavigate();

    const loginUser = (e) => {
        e.preventDefault();
        setIsLoading(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setIsLoading(false)
                toast.success("Login success")
                navigate("/")
            })
            .catch((error) => {
                setIsLoading(false)
                toast.error(error.message)
            });
    }

    //Google Login
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {

        signInWithPopup(auth, provider)
            .then((result) => {
                toast.success("Google Login Success")
                navigate("/")
            }).catch((error) => {
                toast.error(error.message)
            });

    }

    return (
        <>
            {isLoading && <Loader />}
            <div className='container my-5 py-3'>
                <div className='row align-items-center justify-content-around'>
                    <div className='col-lg-6'>
                        <img alt='' src={loginImg} className="img-fluid" />
                    </div>
                    <div className='col-lg-4'>
                        <form onSubmit={loginUser} className='card p-3 shadow border-0 '>
                            <div className="mb-3 h2 text-center text-dark">
                                Login
                            </div>
                            <div className="mb-3">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Email address" />
                            </div>
                            <div className="mb-3">
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password" />
                            </div>
                            <div className="d-grid mb-1">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                            <div className='mb-3 small'>
                                <Link to="/reset" className='nav-link'>Reset Password</Link>
                            </div>
                            <div className='text-center mb-3'>
                                --or--
                            </div>
                            <div className="d-grid mb-3">
                                <button onClick={signInWithGoogle} type="submit" className="btn btn-dark">Login with Google</button>
                            </div>
                            <div className='text-center mb-1 d-flex align-items-center justify-content-center'>
                                Don't have an account ?<Link to="/register" className='nav-link'>Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login