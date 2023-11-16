import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Container, Paper, TableContainer, TextField, Typography,TableBody, TableCell, TableHead, TableRow, Table} from '@mui/material'
import  DeleteRoundedIcon  from "@mui/icons-material/DeleteRounded"
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';

import { AppDispatch, RootState } from '../../redux/store'
import { Product } from '../../types/types'
import api from '../../api'
import { AdminSidebar } from './AdminSidebar'
import {
  addProduct,
  fetchProducts,
  productsRequest,
  productsSuccess,
  removeProduct,
  updateProduct,
} from '../../redux/slices/productSlice'

const initialValue: Product = {
  id: 0,
  name: '',
  image: '',
  description: '',
  categories: [],
  variants: [],
  sizes: [],
  price: 0
}

export const ManageProducts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const productsAdmin = useSelector((state: RootState) => state.productsReducer)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [productForm, setproductForm] = useState(initialValue)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  useEffect(() => {
    handleGetProducts()
  }, [])

  const handleGetProducts = async () => {
    dispatch(productsRequest())

  const res = await api.get('/mock/e-commerce/products.json')
    dispatch(productsSuccess(res.data))
  }
  const handleFormOpen = ()=>{
    setIsFormOpen(!isFormOpen)
  }

  const handleDeleteItem = (id: number) => {
    dispatch(removeProduct({ productId: id }))
  }
  const handleEditItem = (id: number) => {
    const editedItem = productsAdmin.products.find((product) => product.id == id)
    if (editedItem) {
      console.log(editedItem)
      setproductForm({ ...editedItem, id: editedItem.id })
    }
  }

  const onChaneHandleItem = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    const isList = name === 'categories' || name === 'variants' || name === 'sizes'
    if (isList) {
      setproductForm({
        ...productForm,
        [name]: value.split(',')
      })
      return
    }

    setproductForm({
      ...productForm,
      [name]: value
    })
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (productForm.id) {
      dispatch(updateProduct(productForm))
    } else {
      setproductForm({
        ...productForm,
        id: productsAdmin.products[productsAdmin.products.length - 1].id + 1
      })

      dispatch(addProduct(productForm))
    }
  }

  return (
    <>
     <div>
        <AdminSidebar/>
        <div className="main-content">
        {productsAdmin.isLoading && <h3> Loading Products...</h3>}
      </div>
      <div className='general-content-product' >
        <Button type="submit" onClick={handleFormOpen}>{productForm.id ? 'edit' : 'add'}</Button>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Container component="main" maxWidth="xs">
        {isFormOpen &&
          <Paper
            elevation={3}
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
            </Typography>
            <form style={{ width: '100%', marginTop: '20px' }} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name of Prouct"
                name="name"
                autoComplete="name"
                value={productForm.name}
                onChange={onChaneHandleItem}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="image"
                label="image url"
                type="image"
                id="image"
                autoComplete="image"
                value={productForm.image}
                onChange={onChaneHandleItem}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="categories"
                label="Category"
                type="categories"
                id="categories"
                autoComplete="categories"
                value={productForm.categories.join(',')}
                onChange={onChaneHandleItem}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="sizes"
                label="Sizes"
                type="sizes"
                id="sizes"
                autoComplete="sizes"
                value={productForm.sizes.join(',')}
                onChange={onChaneHandleItem}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="variants"
                label="Variants"
                type="variants"
                id="variants"
                autoComplete="variants"
                value={productForm.variants.join(',')}
                onChange={onChaneHandleItem}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="description"
                label="Description"
                type="description"
                id="description"
                autoComplete="description"
                value={productForm.description}
                onChange={onChaneHandleItem}
              />
              <Button type='submit'>{productForm.id ? 'edit' : 'add'}</Button>
              </form>
          </Paper>
            }
        </Container>
      </Box>
      </div>
      <div className='general-content-product'>
  
      <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }} >
      <Table className="table-product" >
        <TableHead>
          <TableRow>
            <TableCell align="left">Product id</TableCell>
            <TableCell align="left">Product Name</TableCell>
            <TableCell align="left">Delete</TableCell>
            <TableCell align="left">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {productsAdmin.products.map((product) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="left">
                {product.id}
              </TableCell>
              <TableCell align="left">{product.name}</TableCell>
              <TableCell align="left">
            <DeleteRoundedIcon onClick={() => handleDeleteItem(product.id)} />
              </TableCell>
              <TableCell align="left">
            <ModeEditRoundedIcon onClick={() => handleEditItem(product.id)}/>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
      </div>
      </div>
    </>
  )
}