import { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Container, Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography} from '@mui/material'
import  DeleteRoundedIcon  from "@mui/icons-material/DeleteRounded"
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';

import { AppDispatch, RootState } from "../../redux/store";
import { AdminSidebar } from "./AdminSidebar";
import { addcategory, categoriesRequest, categoriesSuccess, fetchCategory, removecategory, updateCategory } from "../../redux/slices/categorySlice";
import api from "../../api";
import { Table } from "react-bootstrap";


export const ManageCategory = () =>{
  const { categories, isLoading } = useSelector((state: RootState) => state.categoryReducer)
  const dispatch = useDispatch<AppDispatch>()
  const initialValue = { id: 0, name: '' }
  const [categoryForm, setCategoryForm] = useState(initialValue)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchCategory())
  }, [])
    useEffect(() => {
    handleGetCategories()
  }, [])

  const handleGetCategories = async () => {
    dispatch(categoriesRequest())

  const res = await api.get('/mock/e-commerce/categories.json')
    dispatch(categoriesSuccess(res.data))
  }
  const handleFormOpen = ()=>{
    setIsFormOpen(!isFormOpen)
  }
  const handleEdit = (id: number) => {
    const editedCategory = categories.find((category) => category.id == id)
    if (editedCategory) {
      setCategoryForm({ ...editedCategory, name: editedCategory.name })
    }
  }
  const handleDelete = (id: number) => {
    dispatch(removecategory({ categoryId: id }))
  }

  const onChaneHandleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCategoryForm({ ...categoryForm, name: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (categoryForm.id) {
      dispatch(updateCategory(categoryForm))
    } else {
      setCategoryForm({ ...categoryForm, id: categories[categories.length - 1].id + 1 })

      dispatch(addcategory(categoryForm))
    }
    setCategoryForm(initialValue)
  }

    return(
      <>
      <div>
        <AdminSidebar/>
      <div className="main-content" >
        {isLoading && <h3> Loading Categories...</h3>}
      </div>
      {/* <div style={{overflowY: 'scroll'}}> */}
      <div className='general-content-category'>
        <Button type="submit" onClick={handleFormOpen}>{categoryForm.id ? 'edit' : 'add'}</Button>
      <Box display="flex" justifyContent="center" alignItems="center" >
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
                label="Name of Category"
                name="name"
                autoComplete="name"
                value={categoryForm.name}
                onChange={onChaneHandleCategory}
            />
            <Button type='submit'>{categoryForm.id ? 'edit' : 'add'}</Button>
            </form>

          </Paper>
          }
        </Container>
      </Box>
      </div>
      <div className='general-content-category'>
  
  <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
  <Table className="table-category">
    <TableHead>
      <TableRow>
        <TableCell align="left">Category id</TableCell>
        <TableCell align="left">Category Name</TableCell>
        <TableCell align="left">Delete</TableCell>
        <TableCell align="left">Edit</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {categories.map((category) => (
        <TableRow
          key={category.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row" align="left">
            {category.id}
          </TableCell>
          <TableCell align="left">{category.name}</TableCell>
          <TableCell align="left">
        <DeleteRoundedIcon onClick={() => handleDelete(category.id)} />
          </TableCell>
          <TableCell align="left">
        <ModeEditRoundedIcon onClick={() => handleEdit(category.id)}/>
        </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</Box>
  </div>
    </div>
    {/* </div> */}
    </>
    )
};