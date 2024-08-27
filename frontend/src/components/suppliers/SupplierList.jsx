import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../assets/styles/suppliers/SupplierList.css'; 

function SupplierList() {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3800/api/supp/get')
            .then((response) => {
                setSuppliers(response.data.data);
            }).catch((error) => {
                console.error('Error while fetching list', error);
            });
    }, []);

    const getSupplierById = async(id) => {
        try {
            await axios.get(`http://localhost:3800/api/supp/get/${id}`)
                .then((response) => {
                    setSuppliers(response.data.data);
                }).catch((error) => {
                    console.error('Error while fetching list', error);
                });
        } catch(err) {
            console.error('Error while fetching list', err);
        }
    }

    const deleteSupplierById = async (id) => {
        try {
            await axios.delete(`http://localhost:3800/api/supp/delete/${id}`);
            setSuppliers(suppliers.filter(supplier => supplier.id !== id));
        } catch (error) {
            console.error('Error while deleting supplier', error);
        }
    };

    return (
        <div className="supplier-list-container">
            <h1 className="supplier-list-title">Supplier List</h1>
            <table className="supplier-list-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact Info</th>
                        <th>product ID</th>
                        <th colSpan={4}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(supplier => (
                        <tr key={supplier.id} className="supplier-list-row">
                            <td>{supplier.name}</td>
                            <td>{supplier.contact_info}</td>
                            <td>(productID :{supplier.product_id})</td>
                            <td>
                                <Link to={`/create-supplier`} className="supplier-list-btn">Add</Link>
                            </td>
                            <td>
                                <Link to={`/editsupplier/${supplier.id}`} className="supplier-list-btn">Edit</Link>
                            </td>
                            <td>
                                <button className="supplier-list-btn supplier-list-btn-delete" onClick={() => deleteSupplierById(supplier.id)}>Delete</button>
                            </td>
                            <td>
                                <Link className="supplier-list-btn" onClick={() => { getSupplierById(supplier.id) }}>Detail</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SupplierList;
