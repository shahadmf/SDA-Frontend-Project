import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AppDispatch, RootState } from '../../redux/store'
import AdminSideBar from '../../pages/admin/AdminSideBar'
import { IoIosClose } from 'react-icons/io'
import {
  addProduct,
  fetchProducts,
  removeProduct,
  updateProduct
} from '../../redux/slices/products/productSlice'

function ProductsAdmin() {
  const dispatch: AppDispatch = useDispatch()
  const { products, isLoading, error } = useSelector((state: RootState) => state.products)
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [productImage, setProductImage] = useState('')
  const [isEdited, setIsEdit] = useState(false)
  const [productId, setProductId] = useState(0)
  const [isFormVisible, setIsFormVisible] = useState(false)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{error}</div>
  }

  const handleDelete = (id: number) => {
    dispatch(removeProduct({ productId: id }))
    toast.success('Product deleted successfully!')
  }

  const handleCreateClick = () => {
    setIsFormVisible(!isFormVisible)
  }

  const handleEdit = (
    id: number,
    name: string,
    description: string,
    price: number,
    image: string
  ) => {
    setProductId(id)
    setIsEdit(!isEdited)
    setProductName(name)
    setProductDescription(description)
    setProductPrice(price)
    setProductImage(image)
    setIsFormVisible(true)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    switch (name) {
      case 'productName':
        setProductName(value)
        break
      case 'productDescription':
        setProductDescription(value)
        break
      case 'productPrice':
        setProductPrice(Number(value))
        break
      case 'productImage':
        setProductImage(value)
        break
      default:
        break
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (!productName || !productDescription || !productImage || productPrice <= 0) {
      alert('All fields are required and price must be greater than 0')
      return
    }

    if (productName.length < 2) {
      alert('Product name must be at least 2 characters long')
      return
    }

    if (productDescription.length < 10) {
      alert('Product description must be at least 10 characters long')
      return
    }

    if (!isEdited) {
      const newProduct = {
        id: new Date().getTime(),
        name: productName,
        description: productDescription,
        price: productPrice,
        image: productImage
      }
      dispatch(addProduct(newProduct))
      toast.success('Product added successfully!')
    } else {
      const updateProductData = {
        id: productId,
        name: productName,
        description: productDescription,
        price: productPrice,
        image: productImage
      }
      dispatch(updateProduct(updateProductData))
      setIsEdit(!isEdited)
      toast.success('Product updated successfully!')
    }

    setProductName('')
    setProductDescription('')
    setProductPrice(0)
    setProductImage('')
    setIsFormVisible(false)
  }
  return (
    <div className="wrapper">
      <AdminSideBar />
      <div className="main-content" style={{ overflowY: 'scroll' }}>
        <h2>Products</h2>
        <button onClick={handleCreateClick}>
          {isFormVisible ? <IoIosClose /> : 'Add new product'}
        </button>
        {isFormVisible && (
          <div className="add-form">
            <h3>Add Product</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="productName"
                placeholder="Enter Product Name"
                value={productName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="productDescription"
                placeholder="Enter Product Description"
                value={productDescription}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="productPrice"
                placeholder="Enter Product Price"
                value={productPrice}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="productImage"
                placeholder="Enter Product Image URL"
                value={productImage}
                onChange={handleChange}
                required
              />
              <button>{isEdited ? 'Update' : 'Create'}</button>
            </form>
          </div>
        )}
        <section className="products">
          {products.length > 0 &&
            products.map((product) => {
              return (
                <div className="product" key={product.id}>
                  <div className="product-info">
                    <img src={product.image} alt={product.name} style={{ width: '30%' }} />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>
                      <span>{product.price} SAR</span>
                    </p>
                    <div className="buttons">
                      <button onClick={() => handleDelete(product.id)}>delete</button>
                      <button
                        onClick={() => {
                          handleEdit(
                            product.id,
                            product.name,
                            product.description,
                            product.price,
                            product.image
                          )
                        }}>
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
        </section>
      </div>
    </div>
  )
}

export default ProductsAdmin
