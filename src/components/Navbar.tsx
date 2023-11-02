import {Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../redux/store';
import { logout } from '../redux/slices/userSlice';

export const NavBar = () =>{

    const {isLoggedIn, userData} = useSelector((state: RootState) => state.userReducer)
    const dispatch: AppDispatch = useDispatch(); 
    const navigate = useNavigate();
    const handleChange = () => {
        dispatch(logout())
        // navigate('/')
    }
    return(
        <>
        <nav className='hero-nav'>
        <div className="logo">Device<span>Tech</span></div>
            <ul>
                {isLoggedIn &&  (
                <>
                <li>
                    <a><Link to="/">Home</Link></a>
                </li>
                {/* <li>
                    <a><Link to="/contact">Contact</Link></a>
                </li> */}
                  
                <li>
                    <a><Link to={`${userData?.role}`}> {userData?.role} Dashboard</Link></a>
                </li>

                <li className='right-nav'>
                    <a><Link to="/login" onClick={handleChange}>Logout </Link></a>
                </li>
                    </>
                )} 
                {isLoggedIn && userData?.role === "user" &&  (
                <>
                <li className='right-nav'>
                    <a><Link to="/cart">Cart</Link></a>
                </li>
                </>
                ) }
               
                {!isLoggedIn && (
                    <>
                <li>
                    <a><Link to="/">Home</Link></a>
                </li>
                {/* <li>
                    <a><Link to="/contact">Contact</Link></a>
                </li> */}
                <li className='right-nav'>
                    <a><Link to="/register">Register</Link></a>
                </li>
                <li className='right-nav'>
                    <a><Link to="/login">login</Link></a>
                </li>
                    </>
                )}
            </ul>
        </nav>
        </>
    )
};
