import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../api'
import { Category } from '../../types/types'

export type initialStateCategory = {
  categories: Category[]
  error: null | string
  isLoading: boolean
  filter: number[] | null
  categoryData: Category | null
}

const initialState: initialStateCategory = {
  categories: [],
  error: null,
  isLoading: false, 
  filter: null,
  categoryData: null
}

export const fetchCategory = createAsyncThunk("Category/fetchCategory", async () =>{
  try {
      const response = await api.get('/mock/e-commerce/categories.json')
      return response.data.map((category: Category) => ({
        ...category,
        ischecked: false 
      }))
    } catch (error) {
    console.log(error) 
    }
  })

export const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    changeHandle: (state, action) => {
      state.categories = action.payload
    },
    categoriesRequest: (state) => {
      state.isLoading = true
    },
    categoriesSuccess: (state, action) => {
      state.isLoading = false
      state.categories = action.payload
    },
    updateCategory : (state, action)=>{
      const {id, name}= action.payload
      const foundCategory = state.categories.find((category)=> category.id === id)
      if (foundCategory){
        foundCategory.name = name
      }
    },
    addcategory: (state, action) => {
      const newCategory = action.payload
      if(newCategory){
        state.categories=[...state.categories,newCategory]
      }
    },
    filterByCategories: (state) => {
      const filteredCatgories = state.categories
        .filter((category) => category.ischecked === true)
        .map((category) => category.id)
      state.filter = filteredCatgories
    },
    removecategory: (state, action: { payload: { categoryId: number } }) => {
      const filteredCatgories = state.categories.filter((category) => category.id !== action.payload.categoryId)
      state.categories = filteredCatgories
    }
  }, 
  extraReducers: (builder)=>{
    builder
    .addCase(fetchCategory.pending, (state) =>{
      state.isLoading = true
      state.error = null
    })
    .addCase(fetchCategory.fulfilled, (state, action) =>{
      state.isLoading = false
      state.categories = action.payload
    })
    .addCase(fetchCategory.rejected, (state,action) =>{
      state.isLoading = false
      state.error = action.error.message || "Error"
    })
  }
})
export const { 
  removecategory, addcategory, categoriesRequest, 
  categoriesSuccess, updateCategory, 
  filterByCategories, changeHandle 
} = categorySlice.actions
export default categorySlice.reducer