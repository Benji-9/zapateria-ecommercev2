import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    size: string;
    color: string;
    quantity: number;
    slug: string;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, size: string, color: string) => void;
    updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                const currentItems = get().items;
                const existingItemIndex = currentItems.findIndex(
                    (i) => i.id === item.id && i.size === item.size && i.color === item.color
                );

                if (existingItemIndex > -1) {
                    const newItems = [...currentItems];
                    newItems[existingItemIndex].quantity += item.quantity;
                    set({ items: newItems });
                } else {
                    set({ items: [...currentItems, item] });
                }
            },
            removeItem: (id, size, color) => {
                set({
                    items: get().items.filter(
                        (i) => !(i.id === id && i.size === size && i.color === color)
                    ),
                });
            },
            updateQuantity: (id, size, color, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(id, size, color);
                    return;
                }
                set({
                    items: get().items.map((i) =>
                        i.id === id && i.size === size && i.color === color
                            ? { ...i, quantity }
                            : i
                    ),
                });
            },
            clearCart: () => set({ items: [] }),
            getTotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
