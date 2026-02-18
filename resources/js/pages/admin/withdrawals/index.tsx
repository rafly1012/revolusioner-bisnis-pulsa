import { Head, Link, usePage } from '@inertiajs/react';
import WithdrawalsController from '@/actions/App/Http/Controllers/Admin/WithdrawalsController';
import Heading from '@/components/heading';
import { ItemList } from '@/components/item-list';
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from '@/components/ui/item';
import AdminLayout from '@/layouts/admin/layout';
import AppLayout from '@/layouts/app-layout';
import { cn, formatDateTime } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';
import type { Withdrawal } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Penarikan',
        href: WithdrawalsController.index().url,
    },
];

export default function Index() {
    const { withdrawals } = usePage<{ withdrawals: Withdrawal[] }>().props;
    const statusPriority: Record<string, number> = {
        pending: 1,
        approved: 2,
        rejected: 3,
    };

    const sortedWithdrawals = [...withdrawals].sort((a, b) => {
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
            <Head title="Penarikan" />

            <AdminLayout>
                <div className="space-y-6">
                    <Heading variant="small" title="Penarikan" />

                    <ItemList
                        data={sortedWithdrawals}
                        columns={[
                            {
                                key: 'withdrawal_code',
                                label: 'Withdrawal Code',
                                searchable: true,
                            },
                        ]}
                        renderItem={(withdrawal) => (
                            <Item
                                key={withdrawal.id}
                                size="xs"
                                variant="outline"
                                className={cn(
                                    withdrawal.status === 'pending'
                                        ? 'border-yellow-300 bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300'
                                        : withdrawal.status === 'approved'
                                          ? 'border-green-300 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'
                                          : withdrawal.status === 'rejected'
                                            ? 'border-red-300 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
                                            : '',
                                )}
                                asChild
                            >
                                <Link
                                    href={
                                        WithdrawalsController.show(
                                            withdrawal.id,
                                        ).url
                                    }
                                >
                                    <ItemContent className="gap-1">
                                        <ItemTitle className="capitalize">
                                            {withdrawal.withdrawal_code}
                                        </ItemTitle>
                                        <ItemDescription>
                                            {formatDateTime(
                                                withdrawal.created_at,
                                            )}
                                        </ItemDescription>
                                    </ItemContent>
                                </Link>
                            </Item>
                        )}
                        perPage={10}
                    />
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
