import { faShoppingBag, faShoppingCart, faSignInAlt, faSignOut, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config.js"
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "../../redux/slice/authSlice"
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink.js';

const logo = (
    <Link to="/" className="navbar-brand" href="#">Logo</Link>
)

const cart = (
    <span>
        <NavLink className="nav-link"><FontAwesomeIcon icon={faShoppingCart} /> Cart</NavLink>
    </span>
)


const Header = () => {

    const [displayName, setDisplayName] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutUser = () => {
        signOut(auth).then(() => {
            toast.success("Sign-out successful")
            navigate("/")
        }).catch((error) => {
            toast.error(error.message)
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.displayName == null) {
                    const u1 = user.email.slice(0, -10)
                    const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
                    setDisplayName(uName)
                } else {
                    setDisplayName(user.displayName)
                }

                dispatch(SET_ACTIVE_USER({
                    email: user.email,
                    userName: user.displayName ? user.displayName : displayName,
                    userID: user.uid
                }))
            } else {
                setDisplayName("")
                dispatch(REMOVE_ACTIVE_USER())
            }
        });
    }, [dispatch, displayName])

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container">
                    {logo}
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto ms-auto">
                            <li className="nav-item">
                                <NavLink style={({ isActive }) => ({ color: isActive ? "white" : null })} to="/" className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact" className="nav-link">Contact</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin" className="nav-link">Admin</NavLink>
                            </li>
                        </ul>
                        <div className='d-flex'>
                            <span className='d-flex align-items-center'>
                                
                                <ShowOnLogout>
                                    <NavLink to="/login" className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> Login</NavLink>
                                </ShowOnLogout>

                                <ShowOnLogin>
                                    <div className='text-white'><FontAwesomeIcon icon={faUserAlt} />{displayName}</div>
                                </ShowOnLogin>

                                <ShowOnLogin>
                                    <NavLink to="/order-history" className="nav-link "><FontAwesomeIcon icon={faShoppingBag} /> My Orders</NavLink>
                                </ShowOnLogin>

                            </span>
                            {cart}
                            <ShowOnLogin>
                                <NavLink onClick={logoutUser} to="/" className="nav-link "><FontAwesomeIcon icon={faSignOut} /> Logout</NavLink>
                            </ShowOnLogin>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header