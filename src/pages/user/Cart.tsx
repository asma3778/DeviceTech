import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

import { AppDispatch, RootState } from '../../redux/store'
import { deleteItemCart, deletetAllCart } from '../../redux/slices/productSlice'

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

  const handelRemoveAllCart = () => {
    dispatch(deletetAllCart())
  }

  const cartTotal = () => {
    let totalAmount = 0
    cart.length > 0 &&
      cart.map((cartItem) => (totalAmount = totalAmount + cartItem.price))
    return totalAmount
  }

  return (
    <div className='cart'>
      <h1>cart</h1>
      <div className='cart-amount'>
      <label className="product p-3">Total: {cartTotal()}</label>
      <Button  onClick={() => { handelRemoveAllCart() }}>Delete All Cart items</Button>
      </div>
      <div>
        {cart.length > 0 && (
            <div className="product-in-cart">
              
              {cart.map(({ id, image, name, description, variants, price }) => (
                <Card sx={{ maxWidth: 250 }}>
                    <CardMedia
              sx={{ height: 200 }}
              image={image}
              title={name}
              key={name}
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
        ) }
        
      </div>
    </div>
  )
}