import { Head, Link, usePage } from '@inertiajs/react';
import TransactionsController from '@/actions/App/Http/Controllers/Users/TransactionsController';
import Heading from '@/components/heading';
import { ItemList } from '@/components/item-list';
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from '@/components/ui/item';
import AppLayout from '@/layouts/app-layout';
import UsersLayout from '@/layouts/users/layout';
import { cn, formatDateTime } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';
import type { Transaction } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transaksi',
        href: TransactionsController.index().url,
    },
];

export default function Index() {
    const { transactions } = usePage<{ transactions: Transaction[] }>().props;
    const statusPriority: Record<string, number> = {
        pending: 1,
        approved: 2,
        rejected: 3,
    };

    const sortedTransactions = [...transactions].sort((a, b) => {
        const pa = statusPriority[a.status] ?? 99;
        const pb = statusPriority[b.status] ?? 99;

        if (pa !== pb) {
            return pa - pb;
        }

        return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transaksi" />

            <UsersLayout>
                <div className="space-y-6">
                    <Heading variant="small" title="Transaksi" />

                    <ItemList
                        data={sortedTransactions}
                        columns={[
                            {
                                key: 'transaction_code',
                                label: 'Kode transaksi',
                                searchable: true,
                            },
                        ]}
                        renderItem={(transaction) => (
                            <Item
                                key={transaction.id}
                                size="xs"
                                variant="outline"
                                className={cn(
                                    transaction.status === 'pending'
                                        ? 'border-yellow-300 bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300'
                                        : transaction.status === 'approved'
                                          ? 'border-green-300 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'
                                          : transaction.status === 'rejected'
                                            ? 'border-red-300 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
                                            : '',
                                )}
                                asChild
                            >
                                <Link
                                    href={
                                        TransactionsController.show(
                                            transaction.id,
                                        ).url
                                    }
                                >
                                    <ItemContent>
                                        <ItemTitle className="font-mono">
                                            {transaction.transaction_code}
                                        </ItemTitle>
                                        <ItemDescription>
                                            {formatDateTime(
                                                transaction.created_at,
                                            )}
                                        </ItemDescription>
                                    </ItemContent>
                                </Link>
                            </Item>
                        )}
                        perPage={10}
                    />
                </div>
            </UsersLayout>
        </AppLayout>
    );
}
