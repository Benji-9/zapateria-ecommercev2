'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Order {
    _id: string;
    total: number;
    status: string;
    createdAt: string;
    items: any[];
}

export default function OrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/user/orders')
            .then(res => res.json())
            .then(data => {
                if (data.orders) {
                    setOrders(data.orders);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading orders...</div>;

    if (orders.length === 0) {
        return <div className="text-gray-500">No orders found.</div>;
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <div key={order._id} className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                        <p className="font-medium">Order #{order._id.substring(0, 8)}</p>
                        <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold">${order.total}</p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1
                            ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'}`}>
                            {order.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
