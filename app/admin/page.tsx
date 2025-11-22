'use client';

import { useEffect, useState } from 'react';
import { Users, Package, ShoppingBag, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/stats')
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading stats...</div>;

    const cards = [
        { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-blue-500' },
        { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-green-500' },
        { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'bg-yellow-500' },
        { label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'bg-purple-500' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <div key={card.label} className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <div className={`p-4 rounded-full ${card.color} text-white mr-4`}>
                            <card.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">{card.label}</p>
                            <p className="text-2xl font-bold">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
