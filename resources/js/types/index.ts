export type * from './auth';
export type * from './navigation';
export type * from './ui';

import type { Auth, User } from './auth';

export type SharedData = {
    name: string;
    auth: Auth;
    flash?: {
        success?: string;
        error?: string;
        warning?: string;
        info?: string;
    };
    sidebarOpen: boolean;
    [key: string]: unknown;
};

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type Transaction = {
    id: number;
    user_id: number;
    transaction_code: string;
    total: number;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    updated_at: string;

    details: DetailTransaction[];
    user: User;
    [key: string]: unknown;
};

export type DetailTransaction = {
    id: number;
    transaction_id: number;
    product_id: number;
    price: number;
    qty: number;
    subtotal: number;
    created_at: string;
    updated_at: string;

    product: Product;
    [key: string]: unknown;
};

export type Withdrawal = {
    id: number;
    user_id: number;
    withdrawal_code: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    updated_at: string;

    user: User;
    [key: string]: unknown;
};

export type Wallet = {
    id: number;
    user_id: number;
    balance: number;
    bank_name: string;
    bank_account: string;
    created_at: string;
    updated_at: string;

    user: User;
    logs: WalletLog[];
    [key: string]: unknown;
};

export type WalletLog = {
    id: number;
    user_id: number;
    amount: number;
    type: string;
    description: number;
    created_at: string;
    updated_at: string;

    user: User;
    [key: string]: unknown;
};

export type Announcement = {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};
