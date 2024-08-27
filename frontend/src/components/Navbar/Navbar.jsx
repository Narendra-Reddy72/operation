import React from "react";
import { Link } from "react-router-dom";
import '../../assets/styles/navbar.css'
import ProductList from "../products/ProductList";
import OrderList from "../orders/OrderList";
import SupplierList from "../suppliers/SupplierList";
function Navbar(){
    return(
        <div>
             <h1 className="header">Welcome to Inventory Management System</h1>
    <nav>
        <ul className="navbar">
            <li><Link to='/signup' >Signup</Link></li>
            <li><Link to='/login' >Login</Link></li>
            <li><Link to='/products'>Products</Link></li>
            <li><Link to='/orders'>orders</Link></li>
            <li><Link to= '/suppliers'>suppliers</Link></li>
            <li><Link to='/Dashboard'>Dashboard</Link></li>
        </ul>
    </nav>
             <ProductList/>
             <OrderList/>
             <SupplierList/>
    </div>
    )
}
export default Navbar;