// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// import { AppDispatch, RootState } from '../../redux/store'
// import { Product } from '../../types/types'
// import { ManageProducts } from './ManageProducts'
// import {
//   addItemCart,
//   fetchProducts,
//   sortProduct
// } from '../../redux/slices/productSlice'

// export const Products = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const productsVistor = useSelector((state: RootState) => state.productsReducer)
//   const categories = useSelector((state: RootState) => state.categoryReducer)

//   useEffect(() => {
//     dispatch(fetchProducts())
//   }, [])

//   //searching
//   let searchItems: Product[] = []
//   if (productsVistor.searchTerm) {
//     searchItems = productsVistor.products.filter((product) => {
//       const searchValue = productsVistor.searchTerm.toString().toLowerCase()
//       return product.name.toLowerCase().includes(searchValue)
//     })
//     console.log(fetchProducts)
//   }

//   let filtterdItems = productsVistor.products
//   if (categories.filter) {
//     filtterdItems = productsVistor.products.filter((product) =>
//       product.categories.some((cat) => categories.filter!.includes(cat))
//     )
//   }

//   const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const sortingSelect = e.target.value
//     dispatch(sortProduct(sortingSelect))
//   }
//   const handleAddingCart = (id: number) => {
//     const itemToCart = productsVistor.products.find((product) => product.id === id)
//     if (itemToCart){
//       dispatch(addItemCart(itemToCart))
//     } 
//   }

//   return (
//     <section>
//       <ManageProducts/>
//       {productsVistor.isLoading && <h3> Loading products...</h3>}
//       {productsVistor.searchTerm && <p> search : {productsVistor.searchTerm}</p>}
//       {searchItems.length > 0 && (
//         <>
//           <div>
//             {searchItems.map((product) => (
//               <div key={product.id}>
//                 <img src={product.image} alt={product.name} width="50" />
//                 <p>{product.name}</p>
//                 <input type="button" value="add to cart" />
//               </div>
//             ))}
//           </div>
//           <hr />
//         </>
//       )}
//     </section>
//   )
// }