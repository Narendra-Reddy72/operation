import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../assets/styles/orders/OrderList.css'; // Import the CSS file

function OrderList() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3800/api/ord/get')
            .then((response) => {
                setOrders(response.data.data);
            }).catch((error) => {
                console.error('Error while fetching list', error);
            });
    }, []);

    const getOrderById = async(id) => {
        try {
            const response = await axios.get(`http://localhost:3800/api/ord/get/${id}`);
            setOrders(response.data.data);
        } catch(err) {
            console.error('Error while getting order', err);
        }
    }

    const deleteOrderById = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3800/api/ord/delete/${id}`);
            setOrders(orders.filter(order => order.id !== id));
            console.log(response.data);
        } catch (error) {
            console.error('Error while deleting order', error);
        }
    };

    return (
        <div className="order-list-container">
            <h1 className="order-list-title">Order List</h1>
            <table className="order-list-table">
                <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Order Date</th>
                        <th>Product ID</th>
                        <th>Status</th>
                        <th colSpan={4}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id} className="order-list-row">
                            <td>{order.quantity}</td>
                            <td>{order.order_date}</td>
                            <td>Product ID: {order.product_id}</td>
                            <td>{order.status}</td>
                            <td>
                                <Link to={`/create-order`} className="order-list-btn">Add</Link>
                            </td>
                            <td>
                                <Link to={`/editorder/${order.id}`} className="order-list-btn">Edit</Link>
                            </td>
                            <td>
                                <button className="order-list-btn order-list-btn-delete" onClick={() => deleteOrderById(order.id)}>Delete</button>
                            </td>
                            <td>
                                <button className="order-list-btn order-list-btn-detail" onClick={() => getOrderById(order.id)}>Detail</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderList;
