import { configureStore } from '@reduxjs/toolkit'

import productreducer from './slices/products/productSlice'
import categoriereducer from './slices/categories/categorySlice'
import userreducer from './slices/users/userSlice'
import cartreducer from './slices/cart/cartSlice'
import ordersreducer from './slices/orders/ordersSlice'

export const store = configureStore({
  reducer: {
    products: productreducer,
    categories: categoriereducer,
    users: userreducer,
    cart: cartreducer,
    orders: ordersreducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
