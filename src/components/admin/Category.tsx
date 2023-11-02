import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { ManageCategory } from './ManageCategory'
import {
  changeHandle,
  fetchCategory,
  filterByCategories
} from '../../redux/slices/categorySlice'

// type CheckedCategory = {
//   ischecked: boolean
//   id: number
//   name: string
// }

export const Category = () => {
  const { categories } = useSelector((state: RootState) => state.categoryReducer)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCategory())
  }, [])

  const categoryCheckBoxHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target
    const updatedCategories = categories.map((category) =>
      category.id === Number(id) ? { ...category, ischecked: checked } : category
    )

    dispatch(changeHandle(updatedCategories))
    dispatch(filterByCategories())
  }

  return (
    <div>
      <ManageCategory />
      {categories.map((category) => (
        <div>
          {/* <h2>{category.id}</h2>
          <p>{category.name}</p> */}
          {/* <label htmlFor="category">{category.name}</label>
          <input type="checkbox" onChange={categoryCheckBoxHandle} value={category.name} id={String(category.id)} /> */}
        </div>
      ))}
    </div>
  )
}