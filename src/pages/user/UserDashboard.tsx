import { IoIosClose } from 'react-icons/io'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { editProfile } from '../../redux/slices/users/userSlice'
import '../../styles/Dashboard.scss'
import '../../styles/Profile.scss'

const UserDashboard = () => {
  const { userData } = useSelector((state: RootState) => state.users)

  const dispatch: AppDispatch = useDispatch()

  const [isFormOpen, setIsFormOpen] = useState(false)

  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevUser) => {
      return { ...prevUser, [name]: value }
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!user.firstName || !user.lastName) {
      alert('Both fields are required')
      return
    }

    if (user.firstName.length < 2 || user.lastName.length < 2) {
      alert('First and Last name must be at least 2 characters long')
      return
    }
    const editUserData = { id: userData?.id, ...user }
    dispatch(editProfile(editUserData))
    setIsFormOpen(false)
  }

  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen)
  }
  return (
    <div className="profile-wrapper">
      <h2>Profile</h2>
      <div className="container">
        {userData && (
          <div className="user-info">
            <div key={userData.id}>
              <p>
                <span>First name:</span> {userData.firstName}
              </p>
              <p>
                <span>Last name:</span> {userData.lastName}
              </p>
              <p>
                <span>Email:</span> {userData.email}
              </p>
              <button className="btn" onClick={handleFormOpen}>
                {isFormOpen ? <IoIosClose /> : 'Edit'}
              </button>
            </div>

            <div className="edit-form">
              {isFormOpen && (
                <form onSubmit={handleSubmit}>
                  <div className="first-name">
                    <label htmlFor="firstName">First Name: </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="last-name">
                    <label htmlFor="lastName">Last Name: </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <button className="btn" type="submit">
                    Save
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
        {/* <button className="btn" onClick={handleLogout}>
          Logout
        </button> */}
      </div>
    </div>
  )
}

export default UserDashboard
