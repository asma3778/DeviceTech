import { BrowserRouter, Route, Routes} from "react-router-dom";

import { ProductDetails } from "../pages/home/ProductDetails";
import { Home } from "../pages/home/Home";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { UserDashboard } from "../pages/user/UserDashboard";
import { Category} from "../components/admin/Category";
import { AdminOrders } from "../components/admin/AdminOrders";
import { NavBar } from "../components/Navbar";
import { Error } from "../pages/home/Error";
import { UserProfile } from "../pages/user/UserProfile";
import { UserList } from "../components/admin/UserList";
import { Login } from "../pages/home/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdmindRoute } from "./AdminRoute";
import { Register } from "../pages/home/Register";
// import { NewProductWrapper } from "../components/admin/NewProductWrapper";
import { Cart } from "../pages/user/Cart";
import { ManageProducts } from "../components/admin/ManageProducts";

export const Routers = ()=>{
    return(
        <BrowserRouter>
        <NavBar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/productadding" element={<NewProductWrapper />} /> */}
        {/* Admin */}
        <Route path="/dashboard" element= {<AdmindRoute />}/>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/category" element={<Category />} />
        <Route path="admin/orders" element={<AdminOrders />} />
        <Route path="admin/products" element={<ManageProducts />} />
        <Route path="admin/users" element={<UserList />} />
        {/* User */}
        <Route path="/dashboard" element= {<ProtectedRoute />}/>
        <Route path="user" element={<UserDashboard />} />
        <Route path="user/profile" element={<UserProfile />} />
        <Route path="*" element={<Error />} />
        </Routes>
        </BrowserRouter>
    )
}