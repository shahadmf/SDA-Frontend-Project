import { Link } from 'react-router-dom'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Product, fetchProducts, searchProduct } from '../../redux/slices/products/productSlice'
import { addToCart } from '../../redux/slices/cart/cartSlice'
import { AppDispatch, RootState } from '../../redux/store'
import SortProducts from './SortProducts'
import '../../styles/Dashboard.scss'

function Products() {
  const dispatch: AppDispatch = useDispatch()
  const { searchTerm, products, isLoading, error } = useSelector(
    (state: RootState) => state.products
  )
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{error}</div>
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProduct(event.target.value))
  }
  const handleAddToCart = (product: Product) => {
    console.log(product)
    dispatch(addToCart(product))
  }

  const searchedProducts = searchTerm
    ? products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : products

  const displayedProducts = searchedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="wrapper" id="product-wraper">
      <div className="side-bar">
        <div className="search-container">
          <label htmlFor="search">Search for product</label>
          <input type="text" placeholder="Search.." name="search" onChange={handleSearch} />
        </div>
        <hr />
        <SortProducts />
      </div>
      <div className="main-content" style={{ overflowY: 'scroll' }}>
        <h2>Products</h2>
        <section className="products">
          {displayedProducts.length > 0 &&
            displayedProducts.map((product) => {
              return (
                <div className="product" key={product.id}>
                  <div className="product-image">
                    <Link to={`/products/${product.id}`}>
                      <img src={product.image} alt={product.name} className="img-fluid" />
                    </Link>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="price">{product.price}</p>
                    <div className="buttons">
                      <Link to={`/products/${product.id}`}>
                        <button>View Detailes</button>
                      </Link>

                      <button
                        onClick={() => {
                          handleAddToCart(product)
                        }}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
        </section>

        <div className="pagination-container">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}>
                Previous
              </button>
            </li>
            {Array.from({ length: Math.ceil(searchedProducts.length / itemsPerPage) }, (_, i) => (
              <li className="page-item" key={i + 1}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === Math.ceil(searchedProducts.length / itemsPerPage)}>
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Products
