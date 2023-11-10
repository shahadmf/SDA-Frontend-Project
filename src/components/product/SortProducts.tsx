import React, { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../redux/store'
import { sortProducts } from '../../redux/slices/products/productSlice'

const SortProducts = () => {
  const dispatch: AppDispatch = useDispatch()
  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortProducts(e.target.value))
  }
  return (
    <div className="sort-products">
      <label htmlFor="sort">Sort by:</label>
      <select onChange={handleSort}>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
    </div>
  )
}

export default SortProducts
