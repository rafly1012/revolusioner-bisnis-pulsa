'use client';

import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import type { SharedData } from '@/types';

export function FlashNotification() {
    const { flash } = usePage<SharedData>().props;

    useEffect(() => {
        const now = new Date();
        const formattedDateTime = new Intl.DateTimeFormat('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(now);

        if (flash?.success) {
            toast.success(flash.success, {
                description: formattedDateTime,
            });
        }
        if (flash?.error) {
            toast.error(flash.error, {
                description: formattedDateTime,
            });
        }
        if (flash?.warning) {
            toast.warning(flash.warning, {
                description: formattedDateTime,
            });
        }
        if (flash?.info) {
            toast.info(flash.info, {
                description: formattedDateTime,
            });
        }
    }, [flash]);

    return null;
}
