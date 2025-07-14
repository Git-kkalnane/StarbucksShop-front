// src/store/storage.ts

export const STORAGE_KEYS = {
    USER: 'user',
    CART: 'cart',
    STORE: 'selected_store',
    ORDERS: 'active_orders',
    ACCESS_TOKEN: 'accessToken',
} as const;

// Type definitions for stored data
export type UserType = {
    id: string;
    email: string;
    name?: string;
    [key: string]: any;
} | null;

export type CartItemType = {
    id: string;
    name: string;
    quantity: number;
    price: number;
    [key: string]: any;
};

export type StoreType = {
    id: string;
    name: string;
    [key: string]: any;
} | null;

export type OrderType = {
    id: string;
    items: CartItemType[];
    status: string;
    [key: string]: any;
};

// Helper functions for localStorage/sessionStorage
export const Storage = {
    // token
    getAccessToken: (): string | null => sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
    setAccessToken: (token: string) => sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token),

    // User data (persistent)
    getUser: (): UserType => {
        const u = sessionStorage.getItem(STORAGE_KEYS.USER);
        if (!u || u === 'undefined' || u === 'null') return null;
        try {
            return JSON.parse(u);
        } catch {
            return null;
        }
    },
    setUser: (user: UserType) => sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),

    // Selected store (persistent)
    getStore: (): StoreType => {
        const s = sessionStorage.getItem(STORAGE_KEYS.STORE);
        return s ? JSON.parse(s) : null;
    },
    setStore: (store: StoreType) => sessionStorage.setItem(STORAGE_KEYS.STORE, JSON.stringify(store)),

    // Active orders (persistent)
    getOrders: (): OrderType[] => {
        const o = sessionStorage.getItem(STORAGE_KEYS.ORDERS);
        return o ? JSON.parse(o) : [];
    },
    setOrders: (orders: OrderType[]) => sessionStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders)),

    // Clear all (on logout)
    clearAll: () => {
        sessionStorage.removeItem(STORAGE_KEYS.USER);
        sessionStorage.removeItem(STORAGE_KEYS.STORE);
        sessionStorage.removeItem(STORAGE_KEYS.ORDERS);
        sessionStorage.removeItem(STORAGE_KEYS.CART);
        Storage.removeAccessToken();
    },
    removeAccessToken: () => {
        sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    },
};
