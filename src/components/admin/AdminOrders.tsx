import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";

import { AppDispatch, RootState } from "../../redux/store";
import api from "../../api";
import { AdminSidebar } from "./AdminSidebar";
import { ordersRequest, ordersSuccess, removeOrder } from "../../redux/slices/orderSlice";

export const AdminOrders = () =>{
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const orders = state.orderReducer

  useEffect(() => {
    handleGetOrders()
  }, [])

  const handleGetOrders = async () => {
    dispatch(ordersRequest())

    const res = await api.get('/mock/e-commerce/orders.json')
    dispatch(ordersSuccess(res.data))
  };

    return(
      <div>
          <AdminSidebar />
      <div className="main-content">
        {orders.isLoading && <h3> Loading Orders...</h3>}
      </div>
      <div className="general-content">
          {orders.orders.map((order) => (
      <div>
          <h2>{order.id}</h2>
          <h4>{order.productId }</h4>
          <h4>{order.userId }</h4>
          <p>{order.purchasedAt}</p>
          <Button
                onClick={() => dispatch(removeOrder({ orderId: order.id }))}>
                Remove
          </Button>
      </div>
          ))}
      </div>
      </div>
    )
};