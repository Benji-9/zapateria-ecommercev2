import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import ProfileForm from '@/components/profile/ProfileForm';
import PasswordForm from '@/components/profile/PasswordForm';
import FavoritesList from '@/components/profile/FavoritesList';
import OrderList from '@/components/profile/OrderList';
import LogoutButton from '@/components/profile/LogoutButton';
import Link from 'next/link';

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/login');
    }

    await dbConnect();
    const user = await User.findById((session.user as any).id);

    if (!user) {
        redirect('/login');
    }

    // Serialize user data
    const userData = {
        name: user.name,
        email: user.email,
        birthday: user.birthday,
        gender: user.gender,
        role: user.role,
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Profile</h1>
                <LogoutButton />
            </div>

            <div className="grid md:grid-cols-4 gap-8">
                <div className="md:col-span-1 space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h2 className="font-semibold mb-2">Menu</h2>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#info" className="hover:underline">Personal Info</a></li>
                            <li><a href="#password" className="hover:underline">Security</a></li>
                            <li><a href="#favorites" className="hover:underline">Favorites</a></li>
                            <li><a href="#orders" className="hover:underline">My Orders</a></li>
                            {user.role === 'admin' && (
                                <li className="pt-2 border-t mt-2">
                                    <Link href="/admin" className="text-blue-600 font-semibold hover:underline">
                                        Admin Dashboard
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="md:col-span-3 space-y-12">
                    <section id="info">
                        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
                        <ProfileForm user={userData} />
                    </section>

                    <hr />

                    <section id="password">
                        <h2 className="text-2xl font-semibold mb-4">Security</h2>
                        <PasswordForm />
                    </section>

                    <hr />

                    <section id="favorites">
                        <h2 className="text-2xl font-semibold mb-4">My Favorites</h2>
                        <FavoritesList />
                    </section>

                    <hr />

                    <section id="orders">
                        <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
                        <OrderList />
                    </section>
                </div>
            </div>
        </div>
    );
}
