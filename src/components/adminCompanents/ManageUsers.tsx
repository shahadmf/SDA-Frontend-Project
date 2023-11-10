import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchUsers, removeUser, updateUserBan } from '../../redux/slices/users/userSlice'
import { AppDispatch, RootState } from '../../redux/store'
import AdminSideBar from '../../pages/admin/AdminSideBar'

const ManageUsers = () => {
  const dispatch: AppDispatch = useDispatch()
  const { users, isLoading, error } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{error}</div>
  }
  const handleBan = (id: number) => {
    const editedbanuser = users.find((user) => user.id == id)
    if (editedbanuser) {
      dispatch(updateUserBan(editedbanuser))
    }
  }
  const handleDelete = (id: number) => {
    dispatch(removeUser({ userId: id }))
  }
  return (
    <div className="wrapper">
      <AdminSideBar />
      <div className="main-content">
        <h2>Users</h2>
        <section className="products">
          {users.length > 0 &&
            users.map((user) => {
              if (user.role !== 'admin') {
                return (
                  <div className="product" key={user.id}>
                    <div className="product-info">
                      <p>
                        <span>Name:</span> {user.firstName} {user.lastName}
                      </p>
                      <p>
                        <span>Role:</span> {user.role}
                      </p>
                      <div className="buttons">
                        <button onClick={() => handleBan(user.id)}>
                          {user.ban ? 'unban' : 'ban'}
                        </button>
                        <button onClick={() => handleDelete(user.id)}>delete</button>
                      </div>
                    </div>
                  </div>
                )
              }
            })}
        </section>
      </div>
    </div>
  )
}

export default ManageUsers
