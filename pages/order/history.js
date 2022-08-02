import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { toast } from 'react-toastify';
import { getError } from '../../utils/error';
import Link from 'next/link';

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get('/api/orders/history');
                setOrders(data);
            } catch (err) {
                toast.error(getError(err));
            }
        };
        fetchOrders();
    }, []);

    return (
        <Layout>
            <h1 className="mb-4 text-xl">Order History</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="border-b">
                        <tr>
                            <th className="px-5 text-left">ID</th>
                            <th className="p-5 text-left">DATE</th>
                            <th className="p-5 text-left">TOTAL</th>
                            <th className="p-5 text-left">PAID</th>
                            <th className="p-5 text-left">DELIVERED</th>
                            <th className="p-5 text-left">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="border-b">
                                <td className=" p-5 ">{order._id.substring(20, 24)}</td>
                                <td className=" p-5 ">{order.createdAt.substring(0, 10)}</td>
                                <td className=" p-5 ">${order.totalPrice}</td>
                                <td className=" p-5 ">{order.isPaid ? `${order.paidAt.substring(0, 10)}` : 'not paid'}</td>
                                <td className=" p-5 ">{order.isDelivered ? `${order.deliveredAt.substring(0, 10)}` : 'not delivered'}</td>
                                <td className=" p-5 ">
                                    <Link href={`/order/${order._id}`} passHref>
                                        <a>Details</a>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

OrderHistory.auth = true;
export default OrderHistory;
