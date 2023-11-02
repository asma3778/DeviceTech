import {useEffect} from 'react'
import { useDispatch } from 'react-redux'

import { Routers } from './PagesRouter/PagesRouter'
import { AppDispatch } from './redux/store'
import { fetchCategory } from './redux/slices/categorySlice'
import { fetchOrder } from './redux/slices/orderSlice'
import { fetchProducts } from './redux/slices/productSlice'
import { fetchUser } from './redux/slices/userSlice'



export const App =()=> {
  const dispatch: AppDispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchCategory())
    dispatch(fetchOrder())
    dispatch(fetchProducts())
    dispatch(fetchUser())
  },[])
  
  return (
    <>
    <Routers/>
    </>
  )
}