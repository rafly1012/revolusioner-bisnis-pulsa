import { Head, Link, usePage } from '@inertiajs/react';
import WithdrawalController from '@/actions/App/Http/Controllers/Users/WithdrawalController';
import Heading from '@/components/heading';
import { ItemList } from '@/components/item-list';
import { Button } from '@/components/ui/button';
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
import type { Withdrawal } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Penarikan',
        href: WithdrawalController.index().url,
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

            <UsersLayout>
                <div className="space-y-6">
                    <Heading variant="small" title="Penarikan" />

                    <ItemList
                        data={sortedWithdrawals}
                        columns={[
                            {
                                key: 'withdrawal_code',
                                label: 'Kode penarikan',
                                searchable: true,
                            },
                        ]}
                        renderItem={(Withdrawal) => (
                            <Item
                                key={Withdrawal.id}
                                size="xs"
                                variant="outline"
                                className={cn(
                                    Withdrawal.status === 'pending'
                                        ? 'border-yellow-300 bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300'
                                        : Withdrawal.status === 'approved'
                                          ? 'border-green-300 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'
                                          : Withdrawal.status === 'rejected'
                                            ? 'border-red-300 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
                                            : '',
                                )}
                                asChild
                            >
                                <Link
                                    href={
                                        WithdrawalController.show(Withdrawal.id)
                                            .url
                                    }
                                >
                                    <ItemContent>
                                        <ItemTitle className="font-mono">
                                            {Withdrawal.withdrawal_code}
                                        </ItemTitle>
                                        <ItemDescription>
                                            {formatDateTime(
                                                Withdrawal.created_at,
                                            )}
                                        </ItemDescription>
                                    </ItemContent>
                                </Link>
                            </Item>
                        )}
                        perPage={10}
                        onAdd={
                            <Button size="sm" asChild>
                                <Link href={WithdrawalController.create().url}>
                                    Buat
                                </Link>
                            </Button>
                        }
                    />
                </div>
            </UsersLayout>
        </AppLayout>
    );
}
