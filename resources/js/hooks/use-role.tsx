import { usePage } from '@inertiajs/react';
import type { Auth, User } from '@/types/auth';

export const useRole = () => {
    const { auth } = usePage<{ auth: Auth }>().props;
    const user: User = auth.user;

    const isAdmin = (): boolean => {
        return user.role === 'admin';
    };

    const isUser = (): boolean => {
        return user.role === 'users';
    };

    const hasRole = (role: 'admin' | 'users'): boolean => {
        return user.role === role;
    };

    const getRole = (): 'admin' | 'users' => {
        return user.role;
    };

    return {
        user,
        role: user.role,
        isAdmin,
        isUser,
        hasRole,
        getRole,
    };
};
