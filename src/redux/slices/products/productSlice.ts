import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchProducts = createAsyncThunk('users/fetchProducts', async () => {
  try {
    const response = await api.get('/mock/e-commerce/products.json')
    return response.data
  } catch (error) {
    console.error('Error', error)
  }
})

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
}

export type ProductState = {
  products: Product[]
  error: null | string
  isLoading: boolean
  searchTerm: string
  singleProduct: Product
  selectedCategory: string
}

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  searchTerm: '',
  singleProduct: {} as Product,
  selectedCategory: ''
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchTerm = action.payload
    },

    findProductById: (state, action) => {
      const id = action.payload
      const productFound = state.products.find((product) => product.id === id)
      if (productFound) {
        state.singleProduct = productFound
      }
    },

    sortProducts: (state, action) => {
      const sortingCriteria = action.payload
      if (sortingCriteria === 'name') {
        state.products.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortingCriteria === 'price') {
        state.products.sort((a, b) => a.price - b.price)
      }
    },

    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload
    },

    removeProduct: (state, action) => {
      const filteredProducts = state.products.filter(
        (product) => product.id !== action.payload.productId
      )
      state.products = filteredProducts
    },

    addProduct: (state, action) => {
      state.products.push(action.payload)
    },

    updateProduct: (state, action) => {
      const { id, name, description, image, price } = action.payload
      const foundProduct = state.products.find((product) => product.id === id)
      if (foundProduct) {
        foundProduct.name = name
        foundProduct.description = description
        foundProduct.image = image
        foundProduct.price = price
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message || 'an error occured'
      state.isLoading = false
    })
  }
})

export const {
  findProductById,
  searchProduct,
  sortProducts,
  setSelectedCategory,
  removeProduct,
  addProduct,
  updateProduct
} = productSlice.actions

export default productSlice.reducer
