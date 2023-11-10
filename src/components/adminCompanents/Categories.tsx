import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import AdminSideBar from '../../pages/admin/AdminSideBar'
import { AppDispatch } from '../../redux/store'

import {
  addCategory,
  fetchCategories,
  removeCategory,
  updateCategory
} from '../../redux/slices/categories/categorySlice'
import useCategoryState from '../../hooks/useCategoryState'

const Categories = () => {
  const { categories, isLoading, error } = useCategoryState()
  const [categoryName, setCategoryName] = useState('')
  const [isEdited, setIsEdit] = useState(false)
  const [categoryId, setCategoryId] = useState(0)
  const [categoryNameError, setCategoryNameError] = useState('')
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{error}</div>
  }

  const handleDelete = (id: number) => {
    dispatch(removeCategory({ categoryId: id }))
  }

  const handleEdit = (id: number, name: string) => {
    setCategoryId(id)
    setIsEdit(!isEdited)
    setCategoryName(name)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newCategoryName = event.target.value
    setCategoryName(newCategoryName)

    if (newCategoryName.trim() === '') {
      setCategoryNameError('Category name is required')
    } else {
      setCategoryNameError('')
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (categoryName.trim() === '') {
      setCategoryNameError('Category name is required')
      return
    }
    if (!isEdited) {
      const newCategory = { id: new Date().getTime(), name: categoryName }
      dispatch(addCategory(newCategory))
    } else {
      const updateCategoryData = { id: categoryId, name: categoryName }
      dispatch(updateCategory(updateCategoryData))
      setIsEdit(!isEdited)
    }

    setCategoryName('')
  }

  return (
    <div className="wrapper">
      <AdminSideBar />
      <div className="main-content" style={{ overflowY: 'scroll' }}>
        <h2>Categories</h2>
        <div className="add-form">
          <h3>Add Category</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Category Name"
              value={categoryName}
              onChange={handleChange}
            />
            <button>{isEdited ? 'Update' : 'Create'}</button>
            {categoryNameError && (
              <p className="error-message" style={{ marginLeft: '2%' }}>
                {categoryNameError}
              </p>
            )}
          </form>
        </div>
        <section className="products">
          {categories.length > 0 &&
            categories.map((category) => {
              return (
                <div className="product" key={category.id}>
                  <div className="product-info">
                    <h4>{category.name}</h4>
                    <div className="buttons">
                      <button onClick={() => handleDelete(category.id)}>delete</button>
                      <button
                        onClick={() => {
                          handleEdit(category.id, category.name)
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

export default Categories
