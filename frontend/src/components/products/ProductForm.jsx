import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../../assets/styles/products/ProductForm.css';

function ProductForm() {
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [current_stock, setCurrent_stock] = useState('');
    const [reorder_level, setReorder_level] = useState('');
    const navigate = useNavigate();

    const createProduct = async (e) => {
        e.preventDefault();
        try {
            const payload = { name, sku, description, price, current_stock, reorder_level };
            await axios.post('http://localhost:3800/api/prod/post', payload);
            navigate('/');
        } catch (error) {
            console.error('Error creating product', error);
        }
    }

    return (
        <div className="product-form-container">
            <form onSubmit={createProduct} className="product-form">
                <table className="product-form-table">
                    <tbody>
                        <tr>
                            <td><label htmlFor="name" className="product-form-label">Name:</label></td>
                            <td><input type="text" id="name" className="product-form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter product name" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="sku" className="product-form-label">SKU:</label></td>
                            <td><input type="text" id="sku" className="product-form-input" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="Enter SKU" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="description" className="product-form-label">Description:</label></td>
                            <td><input type="text" id="description" className="product-form-input" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="price" className="product-form-label">Price:</label></td>
                            <td><input type="text" id="price" className="product-form-input" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="current_stock" className="product-form-label">Current Stock:</label></td>
                            <td><input type="text" id="current_stock" className="product-form-input" value={current_stock} onChange={(e) => setCurrent_stock(e.target.value)} placeholder="Enter current stock" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="reorder_level" className="product-form-label">Reorder Level:</label></td>
                            <td><input type="text" id="reorder_level" className="product-form-input" value={reorder_level} onChange={(e) => setReorder_level(e.target.value)} placeholder="Enter reorder level" /></td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button type="submit" className="product-form-button">Create Product</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default ProductForm;

