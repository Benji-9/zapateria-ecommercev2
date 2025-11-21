"use client";

import Link from 'next/link';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';

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
                            Zapatería Familiar
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
                        {/* Search component could go here */}
                    </div>
                    <nav className="flex items-center gap-2">
                        {session ? (
                            <span className="text-sm text-gray-600 mr-2">Hola, {session.user?.name}</span>
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
