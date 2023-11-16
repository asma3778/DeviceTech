import { useEffect, useState, ChangeEvent} from "react";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Pagination } from "@mui/material";

import { AppDispatch, RootState } from "../../redux/store";
import { addItemCart, productsRequest, productsSuccess } from "../../redux/slices/productSlice";
import api from "../../api";
import { Product } from "../../types/types";

export const ProductsCards = () => {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const products = state.productsReducer
  const productsVistor = useSelector((state: RootState) => state.productsReducer)

  const { categories } = useSelector((state: RootState) => state.categoryReducer)
  const [selectCategory, setSelectCategory] = useState<number | ''>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(4)

  useEffect(() => {
    handleGetProducts()
  }, [])

  const handleGetProducts = async () => {
    dispatch(productsRequest())

    const res = await api.get('/mock/e-commerce/products.json')
    dispatch(productsSuccess(res.data))
  }

  const searchedProducts = products.searchTerm
  ? products.products.filter(
      (product) =>
        product.name.toLowerCase().includes(products.searchTerm.toLocaleLowerCase())
    )
  : products.products

  const handleAddingCart = (id: number) => {
    const itemToCart = productsVistor.products.find((product) => product.id === id)
    if (itemToCart){
      dispatch(addItemCart(itemToCart))
    } 
  }

  //category
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value
    setSelectCategory(selectedCategory === '' ? '' : Number(selectedCategory))
  }

  const filterProductsByCategory = (products: Product[], category: number | '') => {
    if (category === '') {
      return products
    }
    return products.filter((product) => product.categories.includes(category))
  }

  const filteredProducts = filterProductsByCategory(searchedProducts, selectCategory)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const buttonElements = []
  for (let i = 2; i <= totalPages - 1; i++) {
    buttonElements.push(
      <Button
        onClick={() => {
          handlePageChange(i)
        }}>
        {i}
      </Button>
    )
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1)
  }
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }
   return(
    <>  
        <div  className="cards">
        <ul>
          {currentItems.length > 0 &&
          currentItems.map((product) => (
            <Card sx={{ maxWidth: 300 }} key={product.id}>
            <CardMedia
              sx={{ height: 300 }}
              image={product.image}
              title={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}<br/>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {product.variants}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.price} $
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleAddingCart(product.id)}>Add To Cart</Button>
              <Link to={`/products/${product.id}`} >
              <Button size="small">Learn More</Button> 
              </Link>
            </CardActions>
          </Card>
          ))}
        </ul>
      </div>
      <div className="pagenation">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        {buttonElements}
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
        </>
    )
};