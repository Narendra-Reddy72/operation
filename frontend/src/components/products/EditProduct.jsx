import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/products/editProduct.css';

function EditProduct() {
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [current_stock, setCurrent_stock] = useState('');
    const [reorder_level, setReorder_level] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:3800/api/prod/get/${id}`);
                const product = response.data.data[0];

                if (product) {
                    setName(product.name || '');
                    setSku(product.sku || '');
                    setDescription(product.description || '');
                    setPrice(product.price || '');
                    setCurrent_stock(product.current_stock || '');
                    setReorder_level(product.reorder_level || '');
                } else {
                    console.log('No product data found');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProducts();
    }, [id]);

    const handleEditProduct = async (e) => {
        e.preventDefault();
        try {
            const payload = { name, sku, description, price, current_stock, reorder_level };
            const response = await axios.put(`http://localhost:3800/api/prod/update/${id}`, payload);
            console.log(response.data);
            navigate('/products');
        } catch (error) {
            console.error('Error while updating product:', error);
        }
    };

    return (
        <div className="edit-product-container">
            <h1 className="edit-product-title">Edit Product</h1>
            <form onSubmit={handleEditProduct} className="edit-product-form">
                <table className="edit-product-table">
                    <tbody>
                        <tr>
                            <td><label htmlFor="name" className="edit-product-label">Name:</label></td>
                            <td><input type="text" id="name" className="edit-product-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter product name" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="sku" className="edit-product-label">SKU:</label></td>
                            <td><input type="text" id="sku" className="edit-product-input" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="Enter SKU" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="description" className="edit-product-label">Description:</label></td>
                            <td><input type="text" id="description" className="edit-product-input" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="price" className="edit-product-label">Price:</label></td>
                            <td><input type="text" id="price" className="edit-product-input" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="current_stock" className="edit-product-label">Current Stock:</label></td>
                            <td><input type="text" id="current_stock" className="edit-product-input" value={current_stock} onChange={(e) => setCurrent_stock(e.target.value)} placeholder="Enter current stock" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="reorder_level" className="edit-product-label">Reorder Level:</label></td>
                            <td><input type="text" id="reorder_level" className="edit-product-input" value={reorder_level} onChange={(e) => setReorder_level(e.target.value)} placeholder="Enter reorder level" /></td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button type="submit" className="edit-product-button">Update Product</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default EditProduct;


