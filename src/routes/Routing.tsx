import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Cart from '../pages/user/Cart'
import UserRouting from './UserRouting'
import AdminRouting from './AdminRouting'
import NavBar from '../components/NavBar'
import Products from '../components/product/Products'
import UserDashboard from '../pages/user/UserDashboard'
import Orders from '../components/adminCompanents/Orders'
import AdminDashboard from '../pages/admin/AdminDashboard'
import Categories from '../components/adminCompanents/Categories'
import ManageUsers from '../components/adminCompanents/ManageUsers'
import ProductDetails from '../components/product/ProductDetails'
import ProductsAdmin from '../components/adminCompanents/ProductsAdmin'

const Routing = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn pathName={''} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="dashboard" element={<UserRouting />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/cart" element={<Cart />} />
        </Route>

        <Route path="dashboard" element={<AdminRouting />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/category" element={<Categories />} />
          <Route path="admin/users" element={<ManageUsers />} />
          <Route path="admin/products" element={<ProductsAdmin />} />
          <Route path="admin/orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Routing
