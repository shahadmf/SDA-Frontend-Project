import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Routing from './routes/Routing'

import './styles/App.scss'
import { AppDispatch } from './redux/store'
import { ToastContainer } from 'react-toastify'
import { fetchUsers } from './redux/slices/users/userSlice'
import { fetchCategories } from './redux/slices/categories/categorySlice'
import { fetchProducts } from './redux/slices/products/productSlice'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
    dispatch(fetchUsers())
  }, [])

  return (
    <div className="App">
      <Routing />
      <ToastContainer />
    </div>
  )
}

export default App
