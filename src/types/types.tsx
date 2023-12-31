// For Products
export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
}
export type initialStateProduct = {
  products: Product[]
  error: null | string
  isLoading: boolean
  searchTerm: string
  productsRequest: number
  singleProduct: Product  
  cart: Product[]  
  currentPage: number; 
  itemsPerPage: number;  
}

// For Category
export type Category = {
id: number
name: string
ischecked: boolean
}
export type initialStateCategory = {
categories: Category[]
error: null | string
isLoading: boolean
filter: number[] | null
categoryData: Category | null
}

// For Users
export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}

export type initialStateUser = {
users: User[]
error: null | string
isLoading: boolean
isLoggedIn: boolean
userData: User | null
}

// For Orders

export type Order ={
id: number
  productId: number
  userId: number
  purchasedAt: string
}
export type initialStateOrders = {
orders: Order[]
error: null | string
isLoading: boolean
}