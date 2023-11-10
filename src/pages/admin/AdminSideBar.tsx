import React from 'react'
import { Link } from 'react-router-dom'

const AdminSideBar = () => {
  return (
    <div className="side-bar">
      <h3>Hello Admin</h3>
      <hr />
      <ul>
        <li>
          <Link to="/dashboard/admin/category">Categories</Link>
        </li>
        <hr />
        <li>
          <Link to="/dashboard/admin/products">Products</Link>
        </li>
        <hr />

        <li>
          <Link to="/dashboard/admin/users">Users</Link>
        </li>
        <hr />

        <li>
          <Link to="/dashboard/admin/orders">Orders</Link>
        </li>
      </ul>
    </div>
  )
}

export default AdminSideBar
