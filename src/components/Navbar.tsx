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
                  <Link to="/">Home</Link>  
                </li>
                {/* <li>
                  <Link to="/contact">Contact</Link>  
                </li> */}
                  
                <li>
                  <Link to={`${userData?.role}`}> {userData?.role} Dashboard</Link>  
                </li>

                <li className='right-nav'>
                  <Link to="/login" onClick={handleChange}>Logout </Link>  
                </li>
                    </>
                )} 
                {isLoggedIn && userData?.role === "user" &&  (
                <>
                <li className='right-nav'>
                  <Link to="/cart">Cart</Link>  
                </li>
                </>
                ) }
               
                {!isLoggedIn && (
                    <>
                <li>
                   <Link to="/">Home</Link>   
                </li>
                {/* <li>
                   <Link to="/contact">Contact</Link>   
                </li> */}
                <li className='right-nav'>
                   <Link to="/register">Register</Link>   
                </li>
                <li className='right-nav'>
                   <Link to="/login">login</Link>   
                </li>
                    </>
                )}
            </ul>
        </nav>
        </>
    )
};
