import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../assets/styles/Dashboard.css';

function InventoryDashboard() {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalStockValue, setTotalStockValue] = useState(0);
    const [productsBelowReorderLevel, setProductsBelowReorderLevel] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3800/api/prod/get')
            .then((response) => {
                const products = response.data.data;
                setProducts(products);
                setTotalProducts(products.length);
                setTotalStockValue(products.reduce((acc, product) => acc + (product.price * product.current_stock), 0));
                setProductsBelowReorderLevel(products.filter(product => product.current_stock < product.reorder_level).length);
            }).catch((error) => {
                console.error('Error while fetching products', error);
            });
    }, []);

    return (
        <div className="inventory-dashboard-container">
            <h1>Inventory Dashboard</h1>
            <div className="summary-view">
                <div className="summary-item">
                    <h2>Total Products</h2>
                    <p>{totalProducts}</p>
                </div>
                <div className="summary-item">
                    <h2>Total Stock Value</h2>
                    <p>${totalStockValue.toFixed(2)}</p>
                </div>
                <div className="summary-item">
                    <h2>Products Below Reorder Level</h2>
                    <p>{productsBelowReorderLevel}</p>
                </div>
            </div>
            <table className="product-list-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Current Stock</th>
                        <th>Reorder Level</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className={product.current_stock < product.reorder_level ? 'low-stock' : ''}>
                            <td>{product.name}</td>
                            <td>{product.sku}</td>
                            <td>{product.description}</td>
                            <td>${product.price}</td>
                            <td>{product.current_stock}</td>
                            <td>{product.reorder_level}</td>
                            <td>
                                <Link to={`/editproduct/${product.id}`} className="product-list-btn">Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryDashboard;
