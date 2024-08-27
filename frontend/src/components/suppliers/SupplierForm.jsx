import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../../assets/styles/suppliers/SupplierForm.css'

function SupplierForm() {
  const [name, setName] = useState('');
  const [contact_info, setContactInfo] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3800/api/prod/get')
      .then((response) => {
        setProducts(response.data.data);
      }).catch((error) => {
        console.error('Error while fetching list', error);
      });
  }, []);

  const createSupplier = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, contact_info, product_id: selectedProduct };
      await axios.post('http://localhost:3800/api/supp/post', payload);
      navigate('/');
    } catch (error) {
      console.error('Error creating supplier', error);
    }
  }

  return (
    <div className="supplier-form-container">
      <form onSubmit={createSupplier} className="supplier-form">
        <table className="supplier-form-table">
          <tbody>
            <tr>
              <td><label htmlFor="name" className="supplier-form-label">Name:</label></td>
              <td><input type="text" id="name" className="supplier-form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter supplier name" /></td>
            </tr>
            <tr>
              <td><label htmlFor="contact_info" className="supplier-form-label">Contact Info:</label></td>
              <td><input type="text" id="contact_info" className="supplier-form-input" value={contact_info} onChange={(e) => setContactInfo(e.target.value)} placeholder="Enter contact info" /></td>
            </tr>
            <tr>
              <td><label htmlFor="product_id" className="supplier-form-label">Products Supplied:</label></td>
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
                <button type="submit" className="supplier-form-button">Create Supplier</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default SupplierForm;
