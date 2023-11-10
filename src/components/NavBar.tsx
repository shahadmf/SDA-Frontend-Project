import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../redux/store'
import { signout } from '../redux/slices/users/userSlice'
import ShoppingCart from './ShoppingCart'
import '../styles/NavBar.scss'

const NavBar = () => {
  const { isSignedin, userData } = useSelector((state: RootState) => state.users)
  const { cartItems } = useSelector((state: RootState) => state.cart)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const handleSignout = () => {
    dispatch(signout())
    navigate('/signin')
  }

  return (
    <nav>
      <div className="logo">
        <h2>Electro Shop</h2>
      </div>
      <div className="nav-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!isSignedin && (
            <>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>

              <li>
                <Link to="/SignUp">Sign Up</Link>
              </li>
            </>
          )}

          {isSignedin && (
            <>
              <li>
                <Link to="/signout" onClick={handleSignout}>
                  Sign Out
                </Link>
              </li>
              {userData?.role === 'admin' && (
                <li>
                  <Link to={`/dashboard/${userData?.role}`}>Dashboard</Link>
                </li>
              )}
              {userData?.role !== 'admin' && (
                <>
                  <li>
                    <Link to={`/dashboard/${userData?.role}`}>Profile</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/user/cart">
                      <ShoppingCart value={cartItems.length > 0 ? cartItems.length : 0} />
                    </Link>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
