import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom"
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

import { AppDispatch, RootState } from "../../redux/store";
import { addItemCart, fetchProducts, findProductById } from "../../redux/slices/productSlice";

export const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const {singleProduct, isLoading, error} = useSelector((state: RootState) => state.productsReducer)
  const {categories} = useSelector((state: RootState) => state.categoryReducer)
  const productsVistor = useSelector((state: RootState) => state.productsReducer)

  useEffect(() => {
    dispatch(fetchProducts()).then(() =>
    dispatch(findProductById(Number(id))))
  }, [id])
  
  const handleAddingCart = (id: number) => {
    const itemToCart = productsVistor.products.find((product) => product.id === id)
    if (itemToCart){
      dispatch(addItemCart(itemToCart))
    } 
  }
  if (isLoading){
    return <h2>Loading...</h2>
  }
  if (error){
    return <h3>{error}</h3>
  }
  
  const getCategoryNameById = (categoryId: number) => {
    const category = categories.find((category)=> category.id === categoryId);
    return category ? category.name + ', ' : 'Category not found'
  }

    return(
      <div className="product-details-card">
        <Card sx={{ maxWidth: 400 }} key={singleProduct.id}>
      <CardMedia
        sx={{ height: 400 }}
        image={singleProduct.image}
        title={singleProduct.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {singleProduct.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {singleProduct.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {singleProduct.categories && singleProduct.categories.join(' , ')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {singleProduct.price} $
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {singleProduct.variants}
        </Typography>
        {/* {singleProduct.categories.map((Category, index)=>(
          <span key={index}>{Category}</span>
        ))} */}
        <Typography variant="body2" color="text.secondary">
        {singleProduct.sizes && singleProduct.sizes.join (' , ')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"onClick={() => {
            navigate('/')}}>
                Back To Shoppinge</Button>
                <Link to= '/cart'>
              <Button size="small" onClick={() => handleAddingCart(singleProduct.id)}>Add To Cart</Button>
              </Link>
      </CardActions>
    </Card>
</div>
    )
};