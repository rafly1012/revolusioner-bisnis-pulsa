import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import TransactionsController from '@/actions/App/Http/Controllers/Admin/TransactionsController';
import UsersController from '@/actions/App/Http/Controllers/Admin/UsersController';
import { ConfirmPasswordDialog } from '@/components/confirm-password-dialog';
import { CopyableItem } from '@/components/copyable-item';
import Heading from '@/components/heading';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Item,
    ItemContent,
    ItemTitle,
    ItemActions,
    ItemDescription,
} from '@/components/ui/item';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/layouts/admin/layout';
import AppLayout from '@/layouts/app-layout';
import { cn, formatCurrency, formatDateTime } from '@/lib/utils';
import type { BreadcrumbItem, Transaction } from '@/types';

export default function Show() {
    const { transaction } = usePage<{ transaction: Transaction }>().props;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Transaksi',
            href: TransactionsController.index().url,
        },
        {
            title: String(transaction.id),
            href: TransactionsController.show(transaction.id).url,
        },
    ];

    const [openConfirm, setOpenConfirm] = useState(false);
    const [nextStatus, setNextStatus] = useState<string | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Transaksi" />

            <AdminLayout>
                <div className="space-y-6">
                    <Heading variant="small" title="Detail Transaksi" />

                    <Card size="sm">
                        <CardHeader>
                            <CardTitle>Informasi Pengguna</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Item variant="muted" size="xs" asChild>
                                <Link
                                    href={
                                        UsersController.show(
                                            transaction.user_id,
                                        ).url
                                    }
                                >
                                    <ItemContent>
                                        <ItemTitle>
                                            {transaction.user.name}
                                        </ItemTitle>
                                        <ItemDescription>
                                            {transaction.user.email}
                                        </ItemDescription>
                                    </ItemContent>
                                    <ItemActions>
                                        <ItemTitle className="font-mono">
                                            {transaction.user.referral_code}
                                        </ItemTitle>
                                    </ItemActions>
                                </Link>
                            </Item>
                        </CardContent>
                    </Card>

                    <Card size="sm">
                        <CardHeader>
                            <CardTitle>Detail Pesanan</CardTitle>
                            <CardDescription>
                                {formatDateTime(transaction.created_at)}
                            </CardDescription>
                            <CardAction>
                                <Select
                                    value={transaction.status}
                                    disabled={
                                        transaction.status === 'approved' ||
                                        transaction.status === 'rejected'
                                    }
                                    onValueChange={(value) => {
                                        setNextStatus(value);
                                        setOpenConfirm(true);
                                    }}
                                >
                                    <SelectTrigger
                                        className={cn(
                                            transaction.status === 'pending' &&
                                                'text-yellow-700 dark:text-yellow-300',
                                            transaction.status === 'approved' &&
                                                'text-green-700 dark:text-green-300',
                                            transaction.status === 'rejected' &&
                                                'text-red-700 dark:text-red-300',
                                        )}
                                    >
                                        <SelectValue placeholder="Ubah Status" />
                                    </SelectTrigger>
                                    <SelectContent
                                        position="popper"
                                        align="end"
                                    >
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value="pending">
                                                Tertunda
                                            </SelectItem>
                                            <SelectItem value="approved">
                                                Diterima
                                            </SelectItem>
                                            <SelectItem value="rejected">
                                                Ditolak
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <ConfirmPasswordDialog
                                    open={openConfirm}
                                    onOpenChange={setOpenConfirm}
                                    triggerHidden
                                    onConfirm={(password) => {
                                        router.patch(
                                            TransactionsController.verify(
                                                transaction.id,
                                            ).url,
                                            {
                                                status: nextStatus,
                                                action_password: password,
                                            },
                                        );
                                    }}
                                />
                            </CardAction>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {/* Products List */}
                            <div className="grid grid-cols-2 gap-2">
                                {transaction.details.map((detail) => (
                                    <Item
                                        key={detail.id}
                                        variant="muted"
                                        size="xs"
                                    >
                                        <ItemContent>
                                            <ItemTitle className="text-xl">
                                                {detail.product.name}
                                            </ItemTitle>
                                            {detail.qty && (
                                                <ItemTitle>
                                                    Qty - {detail.qty}x
                                                </ItemTitle>
                                            )}
                                        </ItemContent>
                                    </Item>
                                ))}
                                <Item variant="muted" size="xs">
                                    <ItemContent>
                                        <ItemTitle className="text-xl">
                                            Total Pembayaran
                                        </ItemTitle>
                                        <ItemTitle>
                                            {formatCurrency(transaction.total)}
                                        </ItemTitle>
                                    </ItemContent>
                                </Item>
                            </div>

                            <Separator />

                            <CopyableItem
                                label="Kode Transaksi"
                                text={transaction.transaction_code}
                            />
                        </CardContent>
                    </Card>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
