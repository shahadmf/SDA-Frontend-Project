import React from 'react'
import { IoIosCart } from 'react-icons/io'

import '../styles/ShoppingCart.scss'

const ShoppingCart = ({ value }: { value: number }) => {
  return (
    <div className="cart-icon">
      <IoIosCart />
      <span className="badge">{value}</span>
    </div>
  )
}

export default ShoppingCart
