import { useEffect} from "react";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

import { AppDispatch, RootState } from "../../redux/store";
import { addItemCart, productsRequest, productsSuccess } from "../../redux/slices/productSlice";
import api from "../../api";

export const ProductsCards = () => {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const products = state.productsReducer
  const productsVistor = useSelector((state: RootState) => state.productsReducer)

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
  
   return(
    <>  
        <div  className="cards">
        <ul>
          {searchedProducts.length > 0 &&
          searchedProducts.map((product) => (
            <Card sx={{ maxWidth: 300 }}>
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
              <Link to= '/cart'>
              <Button size="small" onClick={() => handleAddingCart(product.id)}>Add To Cart</Button>
              </Link>
              <Link to={`/products/${product.id}`} >
              <Button size="small">Learn More</Button> 
              </Link>
            </CardActions>
          </Card>
          ))}
        </ul>
      </div>
        </>
    )
};