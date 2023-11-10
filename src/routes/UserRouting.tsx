import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from '../redux/store'
import SignIn from '../pages/SignIn'

const UserRouting = () => {
  const location = useLocation()
  const { isSignedin, userData } = useSelector((state: RootState) => state.users)
  // To check that the userData is not null first, then compare it whith the role here
  return isSignedin && userData && userData.role === 'user' ? (
    <Outlet />
  ) : (
    <SignIn pathName={location.pathname} />
  )
}

export default UserRouting
