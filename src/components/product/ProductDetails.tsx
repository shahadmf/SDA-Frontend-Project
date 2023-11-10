import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Product, fetchProducts, findProductById } from '../../redux/slices/products/productSlice'
import { addToCart } from '../../redux/slices/cart/cartSlice'
import { AppDispatch, RootState } from '../../redux/store'
import '../../styles/ProductDetails.scss'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, singleProduct, isLoading, error } = useSelector(
    (state: RootState) => state.products
  )
  const { categories } = useSelector((state: RootState) => state.categories)
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts()).then(() => dispatch(findProductById(Number(id))))
  }, [id])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{error}</div>
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  const getCategoryName = (id: number) => {
    const categoryFound = categories.find((category) => category.id === id)

    return categoryFound ? categoryFound.name + '. ' : 'No category assigned'
  }

  return (
    <div className="product-container">
      <h2>Product Details</h2>
      {singleProduct && (
        <div className="card">
          <h3>{singleProduct.name}</h3>
          <img src={singleProduct.image} alt={singleProduct.name} />
          <p>
            <span>Description: </span>
            {singleProduct.description}
          </p>
          <p>
            <span>Price: </span>
            {singleProduct.price} SAR
          </p>
          <p>
            <span>Category: </span>
            {singleProduct.categories &&
              singleProduct.categories.map((categoryId) => getCategoryName(categoryId))}
          </p>

          {singleProduct.sizes && singleProduct.sizes.length > 0 && (
            <p>
              <span>Size: </span>
              {singleProduct.sizes.join(', ')}
            </p>
          )}

          <button
            onClick={() => {
              handleAddToCart(singleProduct)
            }}>
            Add to cart{' '}
          </button>
          <button
            onClick={() => {
              navigate('/')
            }}>
            Continue Shopping{' '}
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductDetails
