import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AppDispatch } from '../redux/store'
import { addUser, fetchUsers } from '../redux/slices/users/userSlice'

function SignUp() {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
    ban: false
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
    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      alert('All fields are required')
      return
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(user.email)) {
      alert('Please enter a valid email address')
      return
    }

    if (user.password.length < 8) {
      alert('Password must be at least 8 characters long')
      return
    }
    const newUser = { id: new Date().getTime(), ...user }

    dispatch(fetchUsers()).then(() => dispatch(addUser(newUser)))
    toast.success('Account created successfully!')

    setTimeout(() => {
      navigate('/signin')
    }, 2000)
  }

  return (
    <div className="form-container">
      <ToastContainer />
      <div className="card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
