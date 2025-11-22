"use client";

import Link from 'next/link';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';

import { SearchBar } from '@/components/ui/SearchBar';

export function Navbar() {
    const { items } = useCart();
    const { data: session } = useSession();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            Zapateria Boston
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link href="/products" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Catálogo
                        </Link>
                        <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Nosotros
                        </Link>
                        {session?.user && (session.user as any).role === 'admin' && (
                            <Link href="/admin" className="transition-colors hover:text-foreground/80 text-indigo-600 font-semibold">
                                Admin Panel
                            </Link>
                        )}
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <SearchBar />
                    </div>
                    <nav className="flex items-center gap-2">
                        {session ? (
                            <div className="relative group">
                                <button className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-black focus:outline-none">
                                    <span>Hola, {session.user?.name}</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Mi Perfil
                                    </Link>
                                    {(session.user as any).role === 'admin' && (
                                        <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Panel Admin
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => import('next-auth/react').then(mod => mod.signOut())}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login">
                                <Button variant="ghost" size="sm">Login</Button>
                            </Link>
                        )}
                        <Link href="/cart">
                            <Button variant="ghost" size="sm" className="w-9 px-0 relative">
                                <ShoppingCart className="h-4 w-4" />
                                <span className="sr-only">Carrito</span>
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center">
                                        {itemCount}
                                    </span>
                                )}
                            </Button>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
