import { Head, usePage, router } from '@inertiajs/react';
import WalletsController from '@/actions/App/Http/Controllers/Users/WalletsController';
import Heading from '@/components/heading';
import { ItemList } from '@/components/item-list';
import { Button } from '@/components/ui/button';
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemTitle,
} from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import UsersLayout from '@/layouts/users/layout';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';
import type { Wallet } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dompet',
        href: WalletsController.index().url,
    },
];

type NotificationItem = {
    id: string;
    description: string;
    created_at: string;
    isUnread: boolean;
};

export default function Index() {
    const { wallet, notifications, unread_count } = usePage<{
        wallet: Wallet;
        notifications: any[];
        unread_count: number;
    }>().props;

    const hasBankData = wallet.bank_name && wallet.bank_account;

    const markAllAsRead = () => {
        router.post('/notifications/read-all');
    };

    const allNotifications: NotificationItem[] = notifications.map((n) => ({
        id: n.id.toString(),
        description: n.data.message ?? n.data.description ?? '',
        created_at: n.created_at ?? '',
        isUnread: !n.read_at,
    }));

    // Urutkan terbaru dulu
    allNotifications.sort(
        (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dompet" />

            <UsersLayout>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Heading variant="small" title="Dompet" />
                        {unread_count > 0 && (
                            <Button
                                variant="destructive"
                                size="xs"
                                onClick={markAllAsRead}
                                className="cursor-pointer"
                            >
                                Tandai Semua Sudah Dibaca
                            </Button>
                        )}
                    </div>

                    {hasBankData && (
                        <ItemGroup className="grid grid-cols-2 gap-0.5">
                            <Item size="xs" variant="outline">
                                <ItemContent>
                                    <ItemDescription>Bank</ItemDescription>
                                    <ItemTitle>{wallet.bank_name}</ItemTitle>
                                </ItemContent>
                            </Item>

                            <Item size="xs" variant="outline">
                                <ItemContent>
                                    <ItemDescription>
                                        Nomor Rekening
                                    </ItemDescription>
                                    <ItemTitle className="font-mono">
                                        {wallet.bank_account}
                                    </ItemTitle>
                                </ItemContent>
                            </Item>
                        </ItemGroup>
                    )}

                    <Separator />

                    <Heading variant="small" title="Riwayat Dompet" />

                    <ItemList
                        data={notifications.map((n) => ({
                            id: n.id.toString(),
                            description: n.data.message ?? n.data.description,
                            created_at: n.created_at ?? '',
                            isUnread: !n.read_at,
                            code:
                                n.data.transaction_code ??
                                n.data.withdrawal_code,
                            total: n.data.total ?? n.data.amount,
                            status: n.data.status,
                        }))}
                        renderItem={(item) => (
                            <Item
                                key={item.id}
                                size="xs"
                                variant="outline"
                                className="relative"
                            >
                                <ItemContent>
                                    <ItemTitle className="capitalize">
                                        {item.description}
                                    </ItemTitle>
                                    <ItemTitle className="capitalize">
                                        {formatCurrency(item.total)}
                                    </ItemTitle>
                                    <ItemDescription>
                                        {formatDateTime(item.created_at)}
                                    </ItemDescription>
                                    <ItemDescription>
                                        {item.code}
                                    </ItemDescription>
                                    {item.isUnread && (
                                        <span className="absolute -top-1 -right-1 rounded-full bg-destructive px-1.5 text-xs text-background">
                                            Baru
                                        </span>
                                    )}
                                </ItemContent>
                                <ItemContent>
                                    <ItemTitle className="capitalize">
                                        {item.status}
                                    </ItemTitle>
                                </ItemContent>
                            </Item>
                        )}
                        perPage={10}
                        searchable={false}
                    />
                </div>
            </UsersLayout>
        </AppLayout>
    );
}
