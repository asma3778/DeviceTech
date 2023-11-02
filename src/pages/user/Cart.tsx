import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

import { AppDispatch, RootState } from '../../redux/store'
import { deleteItemCart } from '../../redux/slices/productSlice'

export const Cart = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { cart } = useSelector((state: RootState) => state.productsReducer)
  
  const handleDeleteCart = (id: number) => {
    const deletedItem = cart.find((item) => item.id === id)

    if (deletedItem) {
      const updatedCart = cart.filter((product) => product.id != deletedItem.id)
      dispatch(deleteItemCart(updatedCart))
    }
  }

  return (
    <div className='cart'>
      <h1>cart</h1>
      <div>
        {cart.length > 0 ? (
            <div className="product-in-cart">
              {cart.map(({ id, image, name, description, variants, price }) => (
                <Card sx={{ maxWidth: 350 }}>
                    <CardMedia
              sx={{ height: 300 }}
              image={image}
              title={name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}<br/>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {variants}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {price} $
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() =>{ handleDeleteCart(id)
               }}>Delete</Button>
              </CardActions>
                </Card>
                ))}
            </div>
        ) : (
          <p>nothing in cart</p>
        )}
      </div>
    </div>
  )
}