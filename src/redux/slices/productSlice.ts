import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import api from '../../api'
import { Product, initialStateProduct } from '../../types/types'

export const fetchProducts = createAsyncThunk("Products/fetchProducts", async () =>{
  try {
      const response = await api.get('/mock/e-commerce/products.json')
      if (!response) {
        throw new Error('Network response error');}
     
      const Products = response.data;
      return Products;
    } catch (error) {
    console.log(error) 
    } 
  })

  const initialState: initialStateProduct = {
    products: [],
    error: null,
    isLoading: false, 
    searchTerm: '',
    productsRequest: 0,
    singleProduct: {} as Product,
    cart: [],
    currentPage: 0,
    itemsPerPage: 0,
  }

export const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    searchProduct: (state, action) => {
      state.searchTerm= action.payload
    },
    findProductById: (state, action) => {
      const id = action.payload
      const foundProduct = state.products.find((product) => product.id === id)
      if (foundProduct){
      state.singleProduct = foundProduct
      }
    },
    sortProduct: (state, action) => {
      const sortingInput = action.payload
      if (sortingInput == 'asc') state.products.sort((a, b) => a.name.localeCompare(b.name))
      else if (sortingInput == 'desc')
        state.products.sort((a, b) => a.name.localeCompare(b.name)).reverse()
      else state.products
    },
    addItemCart: (state, action) => {
      const item = action.payload
      if (item) {
        state.cart = [...state.cart, item]
      }
    },
    filterProducts: (state, action) => {
      const sortingOption = action.payload
      if (sortingOption === 'name') {
        state.products.sort((product1, product2) =>
          product1.name.localeCompare(product2.name)
        )
      } else if (sortingOption === 'price')
        state.products.sort((product1, product2) => product1.price - product2.price)
    },
    deleteItemCart: (state, action) => {
      state.cart = action.payload
    },
    deletetAllCart: (state) => {
      state.cart = []
      localStorage.removeItem('cart')
    },
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action) => {
      state.isLoading = false
      state.products = action.payload
    },
    addProduct: (state, action) => {
      const newProduct = action.payload
      if(newProduct){
        state.products=[...state.products,newProduct]
      }
    },
    updateProduct:(state, action:  PayloadAction<Product>) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);

      if (index !== -1) {
        state.products[index] = action.payload;
      }

    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.products.filter((product) => product.id !== action.payload.productId)
      state.products = filteredItems
    }
  },
    extraReducers: (builder)=>{
    builder
    .addCase(fetchProducts.pending, (state) =>{
      state.isLoading = true
      state.error = null
    })
    .addCase(fetchProducts.fulfilled, (state, action: any) =>{
      state.isLoading = false
      state.products = action.payload
    })
    .addCase(fetchProducts.rejected, (state,action) =>{
      state.isLoading = false
      state.error = action.error.message || "Error"
    })
  }
})
export const { 
  removeProduct, addProduct, productsRequest, 
  productsSuccess, findProductById, searchProduct, 
  addItemCart, deleteItemCart, setPage, 
  filterProducts, updateProduct, sortProduct, deletetAllCart 
} = productSlice.actions
export default productSlice.reducer