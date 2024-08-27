import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../assets/styles/products/ProductList.css';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3800/api/prod/get')
            .then((response) => {
                setProducts(response.data.data);
            }).catch((error) => {
                console.error('Error while fetching list', error);
            });
    }, []);

    const getProductById = async(id) => {
        try {
            await axios.get(`http://localhost:3800/api/prod/get/${id}`)
                .then((response) => {
                    setProducts(response.data.data);
                }).catch((error) => {
                    console.error('Error while fetching list', error);
                });
        } catch(err) {
            console.error('Error while fetching list', err);
        }
    }

    const deleteProductById = async (id) => {
        try {
            await axios.delete(`http://localhost:3800/api/prod/delete/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error while deleting product', error);
        }
    };

    return (
        <div className="product-list-container">
            <h1 className="product-list-title">Product List</h1>
            <table className="product-list-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Current Stock</th>
                        <th>Reorder Level</th>
                        <th colSpan={4}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="product-list-row">
                            <td>{product.name}</td>
                            <td>{product.sku}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.current_stock}</td>
                            <td>{product.reorder_level}</td>
                            <td>
                                <Link to={`/create-product`} className="product-list-btn">Add</Link>
                            </td>
                            <td>
                                <Link to={`/editproduct/${product.id}`} className="product-list-btn">Edit</Link>
                            </td>
                            <td>
                                <button className="product-list-btn product-list-btn-delete" onClick={() => deleteProductById(product.id)}>Delete</button>
                            </td>
                            <td>
                                <Link className="product-list-btn" onClick={() => { getProductById(product.id) }}>Detail</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;



