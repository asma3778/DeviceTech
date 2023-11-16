import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../api'
import { Order, initialStateOrders } from '../../types/types'

const initialState: initialStateOrders = {
  orders: [],
  error: null,
  isLoading: false, 
}

export const fetchOrder = createAsyncThunk("UserOrders/fetchOrder", async () =>{
  try {
      const response = await api.get('/mock/e-commerce/orders.json')

      if (!response) {
        throw new Error('Network response error');}
     
      const Orders = response; 
      return Orders;
    } catch (error) {
    console.log(error) 
    }
  })

export const orderSlice = createSlice({
  name: 'Order',
  initialState: initialState,
  reducers: {
    ordersRequest: (state) => {
      state.isLoading = true
    },
    ordersSuccess: (state, action) => {
      state.isLoading = false
      state.orders = action.payload
    },
    addOrder: (state, action: { payload: { order: Order } }) => {
    
      state.orders = [action.payload.order, ...state.orders]
    },
    removeOrder: (state, action: { payload: { orderId: number } }) => {
      const filteredItems = state.orders.filter((order) => order.id !== action.payload.orderId)
      state.orders = filteredItems
    }
  },
  // extraReducers: (builder)=>{
  //   builder
  //   .addCase(fetchOrder.pending, (state) =>{
  //     state.isLoading = true
  //     state.error = null
  //   })
  //   .addCase(fetchOrder.fulfilled, (state, action: any) =>{
  //     state.isLoading = false
  //     state.orders = action.payload
  //   })
  //   .addCase(fetchOrder.rejected, (state,action) =>{
  //     state.isLoading = false
  //     state.error = action.error.message || "Error"
  //   })
  // }
})

export const { removeOrder, addOrder, ordersRequest, ordersSuccess } = orderSlice.actions
export default orderSlice.reducer