import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/orders/EditOrder.css'; // Import the CSS file

function EditOrder() {
    const [quantity, setQuantity] = useState('');
    const [product_id, setProduct_id] = useState('');
    const [order_date, setOrder_date] = useState('');
    const [status, setStatus] = useState('');
    const [products, setProducts] = useState([]);
    
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:3800/api/ord/get/${id}`);
                const order = response.data.data[0];

                if (order) {
                    setQuantity(order.quantity || '');
                    setProduct_id(order.product_id || '');
                    setOrder_date(order.order_date || '');
                    setStatus(order.status || 'Pending');
                } else {
                    console.log('No order data found');
                }
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3800/api/prod/get');
                setProducts(response.data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchOrder();
        fetchProducts();
    }, [id]);

    const handleEditOrder = async (e) => {
        e.preventDefault();
        try {
            const payload = { quantity, product_id, order_date, status };
            const response = await axios.put(`http://localhost:3800/api/ord/update/${id}`, payload);
            console.log('Updated order:', response.data.data);
            navigate('/orders');
        } catch (error) {
            console.error('Error while updating order:', error);
        }
    };

    return (
        <div className="edit-order-container">
            <h1 className="edit-order-title">Edit Order</h1>
            <form onSubmit={handleEditOrder} className="edit-order-form">
                <table className="edit-order-table">
                    <tbody>
                        <tr>
                            <td><label htmlFor="quantity" className="edit-order-label">Quantity:</label></td>
                            <td><input type="text" id="quantity" className="edit-order-input" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Enter quantity" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="product_id" className="edit-order-label">Product:</label></td>
                            <td>
                                <select id="product_id" className="edit-order-select" value={product_id} onChange={(e) => setProduct_id(e.target.value)}>
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
                            <td><label htmlFor="order_date" className="edit-order-label">Order Date:</label></td>
                            <td><input type="text" id="order_date" className="edit-order-input" value={order_date} onChange={(e) => setOrder_date(e.target.value)} placeholder="Enter order date" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="status" className="edit-order-label">Status:</label></td>
                            <td>
                                <select id="status" className="edit-order-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button type="submit" className="edit-order-button">Update Order</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default EditOrder;


