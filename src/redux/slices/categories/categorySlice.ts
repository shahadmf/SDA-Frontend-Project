import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchCategories = createAsyncThunk('users/fetchCategories', async () => {
  try {
    const response = await api.get('/mock/e-commerce/categories.json')
    return response.data
  } catch (error) {
    console.error('Error', error)
  }
})

export type Category = {
  id: number
  name: string
}

export type CategoryState = {
  categories: Category[]
  error: null | string
  isLoading: boolean
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  isLoading: false
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    removeCategory: (state, action: { payload: { categoryId: number } }) => {
      const filteredCategories = state.categories.filter(
        (category) => category.id !== action.payload.categoryId
      )
      state.categories = filteredCategories
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload)
    },
    updateCategory: (state, action) => {
      const { id, name } = action.payload
      const foundCategory = state.categories.find((category) => category.id === id)
      if (foundCategory) {
        foundCategory.name = name
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.error = action.error.message || 'an error occured'
      state.isLoading = false
    })
  }
})

export const { removeCategory, addCategory, updateCategory } = categorySlice.actions

export default categorySlice.reducer
