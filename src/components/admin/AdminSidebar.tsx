import {Link} from 'react-router-dom'

export const AdminSidebar = () =>{
    return(
        <>
        <aside className='sidebar'>
            <header className='sidebar-header'>Admin Dashboard</header>
                <ul className='sidebar-container'>
                    <li>
                       <a> <Link to="/admin/category">Category </Link></a>
                    </li>
                    <li>
                        <a><Link to="/admin/products">Products </Link></a>
                    </li>
                    <li>
                        <a><Link to="/admin/users">Users </Link></a>
                    </li>
                    <li>
                        <a><Link to="/admin/orders">Orders </Link></a>
                    </li>
                </ul>
    </aside>
</>
    )
};