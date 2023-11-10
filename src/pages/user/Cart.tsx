import React from 'react'
import { HiTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AppDispatch, RootState } from '../../redux/store'
import { clearCart, removeFromCart } from '../../redux/slices/cart/cartSlice'
import '../../styles/ShoppingCart.scss'

const Cart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart)

  const dispatch: AppDispatch = useDispatch()

  const handleRemoveAll = () => {
    dispatch(clearCart())
  }
  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id))
    toast.success('Item removed from cart')
  }

  return (
    <div className="cart-wrapper">
      <h2>Cart</h2>
      <div className="container">
        <div className="cart-title">
          <h3>Total items in the cart: {cartItems.length > 0 ? cartItems.length : 0}</h3>
        </div>
        {cartItems.length > 0 && (
          <div className="clear-button">
            <button className="btn btn-danger" onClick={handleRemoveAll}>
              Clear Cart
            </button>
          </div>
        )}
        <div className="cart-main">
          <ToastContainer />
          {cartItems.length > 0 && (
            <>
              <div className="cart-items">
                {cartItems.map((cartItem) => {
                  return (
                    <div className="cart-item" key={cartItem.id}>
                      <div className="cart-item-img">
                        <img src={cartItem.image} alt={cartItem.name} />
                      </div>
                      <div className="cart-item-info">
                        <div className="cart-item-title">
                          <h3>{cartItem.name}</h3>
                        </div>
                        <div className="cart-item-price">
                          <h4>{cartItem.price} SAR</h4>
                        </div>
                      </div>
                      <div className="cart-item-remove">
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleRemoveFromCart(cartItem.id)
                          }}>
                          <HiTrash />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
          <hr />
          <div className="cart-total">
            <div className="cart-total-title">
              <h3>Total</h3>
            </div>
            <div className="cart-total-price">
              <h4>
                {cartItems.reduce((acc, curr) => {
                  return acc + curr.price
                }, 0)}
                <span> SAR</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
