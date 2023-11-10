import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminSideBar from '../../pages/admin/AdminSideBar'
import { AppDispatch, RootState } from '../../redux/store'
import { Order, deleteOrder, fetchOrders } from '../../redux/slices/orders/ordersSlice'

const Orders = () => {
  const { orders, isLoading, error } = useSelector((state: RootState) => state.orders)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrders())
  }, [])

  const handleDeleteOrder = (id: number) => {
    dispatch(deleteOrder(id))
  }

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="wrapper">
      <AdminSideBar />
      <div className="main-content" style={{ overflowY: 'scroll' }}>
        <h2>Orders</h2>

        <section className="products">
          {orders.length > 0 &&
            orders.map((order: Order) => {
              const { id, productId, userId, purchasedAt } = order
              return (
                <div className="product" key={id}>
                  <div className="product-info">
                    <h4> Order Id: {id} </h4>
                    <p>Product Id: {productId} </p>
                    <p>User Id: {userId} </p>
                    <p>Purchase time: {purchasedAt} </p>

                    <div className="buttons">
                      <button
                        className="btn"
                        onClick={() => {
                          handleDeleteOrder(id)
                        }}>
                        Cancel
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

export default Orders
