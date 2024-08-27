import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/suppliers/EditSupplier.css';

function EditSupplier() {
    const [name, setName] = useState('');
    const [contact_info, setContactInfo] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await axios.get(`http://localhost:3800/api/supp/get/${id}`);
                const supplier = response.data.data;

                if (supplier) {
                    setName(supplier.name || '');
                    setContactInfo(supplier.contact_info || '');
                    setSelectedProduct(supplier.product_id || '');
                } else {
                    console.log('No supplier data found');
                }
            } catch (error) {
                console.error('Error fetching supplier:', error);
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

        fetchSupplier();
        fetchProducts();
    }, [id]);

    const handleEditSupplier = async (e) => {
        e.preventDefault();
        try {
            const payload = { name, contact_info, product_id: selectedProduct };
            const response = await axios.put(`http://localhost:3800/api/supp/update/${id}`, payload);
            console.log(response.data);
            navigate('/suppliers');
        } catch (error) {
            console.error('Error while updating supplier:', error);
        }
    };

    return (
        <div className="edit-supplier-container">
            <h1 className="edit-supplier-title">Edit Supplier</h1>
            <form onSubmit={handleEditSupplier} className="edit-supplier-form">
                <table className="edit-supplier-table">
                    <tbody>
                        <tr>
                            <td><label htmlFor="name" className="edit-supplier-label">Name:</label></td>
                            <td><input type="text" id="name" className="edit-supplier-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter supplier name" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="contact_info" className="edit-supplier-label">Contact Info:</label></td>
                            <td><input type="text" id="contact_info" className="edit-supplier-input" value={contact_info} onChange={(e) => setContactInfo(e.target.value)} placeholder="Enter contact info" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="product_id" className="edit-supplier-label">Products Supplied:</label></td>
                            <td>
                                <select id="product_id" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                                    <option value="">Select a product</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>{product.name} (ID:{product.id})</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button type="submit" className="edit-supplier-button">Update Supplier</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default EditSupplier;

