// import { useState, ChangeEvent, FormEvent } from 'react'
// import { useDispatch } from 'react-redux'

// import { ProductForm } from './ProductForm'
// import { addProduct} from '../../redux/slices/productSlice'
// import { AppDispatch } from '../../redux/store'
// import { Product } from '../../types/types'

// const initialProductState: Product = {
//   id: 0,
//   name: '',
//   image: '',
//   description: '',
//   categories: [],
//   variants: [],
//   sizes: [],
//   price: 0
// }

// export const NewProductWrapper = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const [product, setProduct] = useState<Product>(initialProductState)

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target

//     const isList = name === 'categories' || name === 'variants' || name === 'sizes'
//     if (isList) {
//       setProduct({
//         ...product,
//         [name]: value.split(',')
//       })
//       return
//     }

//     setProduct({
//       ...product,
//       [name]: value
//     })
//   }

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault()
//     product.id = +new Date()
//    dispatch(addProduct({ product }))
//     setProduct(initialProductState)
//   }

//   return (
//     <div>
//       <h3>Add a new product</h3>
//       {/* <ProductForm handleSubmit={handleSubmit} handleChange={handleChange} product={product} /> */}
//     </div>
//   )
// }