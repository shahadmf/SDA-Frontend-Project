import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Order = {
  id: number
  productId: number
  userId: number
  purchasedAt: string
}

export type OrdersState = {
  orders: Order[]
  error: null | string
  isLoading: boolean
  searchInput: string
}

const initialState: OrdersState = {
  orders: [],
  error: null,
  isLoading: false,
  searchInput: ''
}

export const fetchOrders = createAsyncThunk('fetchOrders', async () => {
  try {
    const response = await api.get('/mock/e-commerce/orders.json')
    if (!response) {
      throw new Error('Network erroe')
    }
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    searchOrder: (state, action) => {
      state.searchInput = action.payload
    },
    deleteOrder: (state, action) => {
      const id = action.payload
      const filteredOrders = state.orders.filter((order) => order.id !== id)
      state.orders = filteredOrders
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.error = action.error.message || 'Error has occured!'
      state.isLoading = false
    })
  }
})

export const { searchOrder, deleteOrder } = ordersSlice.actions
export default ordersSlice.reducer
