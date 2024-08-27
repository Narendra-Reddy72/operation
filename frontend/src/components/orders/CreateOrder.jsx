import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../../assets/styles/orders/CreateOrder.css'; // Import the CSS file

function CreateOrder() {
    const [quantity, setQuantity] = useState('');
    const [product_id, setProduct_id] = useState('');
    const [order_date, setOrder_date] = useState('');
    const [status, setStatus] = useState('Pending');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3800/api/prod/get')
            .then(response => {
                setProducts(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching products', error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { quantity, product_id, order_date, status };
            const response = await axios.post('http://localhost:3800/api/ord/add', payload);
            console.log(response.data.data);
            navigate('/');
        } catch (error) {
            console.error('Error creating orders', error);
        }
    };

    return (
        <div className="create-order-container">
            <form onSubmit={handleSubmit} className="create-order-form">
                <table className="create-order-table">
                    <tbody>
                        <tr>
                            <td><label htmlFor="quantity" className="create-order-label">Quantity:</label></td>
                            <td><input type="text" id="quantity" className="create-order-input" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Enter Quantity" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="product_id" className="create-order-label">Product:</label></td>
                            <td>
                                <select id="product_id" className="create-order-select" value={product_id} onChange={(e) => setProduct_id(e.target.value)}>
                                    <option value="">Select a Product</option>
                                    {products.map(product => (
                                        <option key={product.id} value={product.id}>
                                            {product.name} (ID: {product.id})
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="order_date" className="create-order-label">Order Date:</label></td>
                            <td><input type="text" id="order_date" className="create-order-input" value={order_date} onChange={(e) => setOrder_date(e.target.value)} placeholder="Enter Order Date" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="status" className="create-order-label">Status:</label></td>
                            <td>
                                <select id="status" className="create-order-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2"><button type="submit" className="create-order-button">Create Order</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default CreateOrder;

