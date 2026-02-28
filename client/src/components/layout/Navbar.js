import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/auth';
const Navbar = () => {
    const dispatch = useDispatch()
    const {isAuthenticated, loading} = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(logout())
    }

    const authLinks = (
        <ul>
            <li><button onClick={handleLogout}>Log out</button></li>
        </ul>
    );
    const guestLinks = (
        <ul>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ul>
    );
    return (
        <nav>
            <h1>
                <Link to='/'>Mern auth</Link>
            </h1>
            {!loading && (
                <div>
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            )}
        </nav>
    )
}

export default Navbar
