import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchUsers, signin } from '../redux/slices/users/userSlice'
import { AppDispatch, RootState } from '../redux/store'
import '../styles/From.scss'

export const SignIn = ({ pathName }: { pathName: string }) => {
  const { users } = useSelector((state: RootState) => state.users)
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!user.email || !user.password) {
      alert('Both fields are required')
      return
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(user.email)) {
      alert('Please enter a valid email address')
      return
    }

    if (user.password.length < 6) {
      alert('Password must be at least 6 characters long')
      return
    }

    try {
      const foundUser = users.find(
        (userData) => userData.email === user.email && userData.password === user.password
      )
      if (foundUser) {
        if (foundUser.ban) {
          alert('Your account is banned')
        } else {
          dispatch(signin(foundUser))
          navigate(pathName ? pathName : `/dashboard/${foundUser.role}`)
        }
      } else {
        alert('Invalid email or password')
      }
    } catch (error) {
      console.log(error)
    }
    setUser({
      email: '',
      password: ''
    })
  }

  return (
    <div className="form-container">
      <div className="card">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={user.email} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
