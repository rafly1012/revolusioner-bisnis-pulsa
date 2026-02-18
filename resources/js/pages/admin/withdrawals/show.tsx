import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import UsersController from '@/actions/App/Http/Controllers/Admin/UsersController';
import WithdrawalsController from '@/actions/App/Http/Controllers/Admin/WithdrawalsController';
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
import type { BreadcrumbItem, Withdrawal } from '@/types';

export default function Show() {
    const { withdrawal } = usePage<{ withdrawal: Withdrawal }>().props;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Penarikan',
            href: WithdrawalsController.index().url,
        },
        {
            title: String(withdrawal.id),
            href: WithdrawalsController.show(withdrawal.id).url,
        },
    ];

    const [openConfirm, setOpenConfirm] = useState(false);
    const [nextStatus, setNextStatus] = useState<string | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Penarikan" />

            <AdminLayout>
                <div className="space-y-6">
                    <Heading variant="small" title="Detail Penarikan" />

                    <Card size="sm">
                        <CardHeader>
                            <CardTitle>Informasi Pengguna</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Item variant="muted" size="xs" asChild>
                                <Link
                                    href={
                                        UsersController.show(withdrawal.user_id)
                                            .url
                                    }
                                >
                                    <ItemContent>
                                        <ItemTitle>
                                            {withdrawal.user.name}
                                        </ItemTitle>
                                        <ItemDescription>
                                            {withdrawal.user.email}
                                        </ItemDescription>
                                    </ItemContent>
                                    <ItemActions>
                                        <ItemTitle>
                                            {withdrawal.user.referral_code}
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
                                {formatDateTime(withdrawal.created_at)}
                            </CardDescription>
                            <CardAction>
                                <Select
                                    value={withdrawal.status}
                                    disabled={
                                        withdrawal.status === 'approved' ||
                                        withdrawal.status === 'rejected'
                                    }
                                    onValueChange={(value) => {
                                        setNextStatus(value);
                                        setOpenConfirm(true);
                                    }}
                                >
                                    <SelectTrigger
                                        className={cn(
                                            withdrawal.status === 'pending' &&
                                                'text-yellow-700 dark:text-yellow-300',
                                            withdrawal.status === 'approved' &&
                                                'text-green-700 dark:text-green-300',
                                            withdrawal.status === 'rejected' &&
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
                                            WithdrawalsController.verify(
                                                withdrawal.id,
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
                            <Item variant="muted" size="xs">
                                <ItemContent>
                                    <ItemTitle className="text-xl">
                                        Total Pembayaran
                                    </ItemTitle>
                                    <ItemTitle>
                                        {formatCurrency(withdrawal.amount)}
                                    </ItemTitle>
                                </ItemContent>
                            </Item>

                            <Separator />

                            <CopyableItem
                                label="Kode Penarikan"
                                text={withdrawal.withdrawal_code}
                            />
                        </CardContent>
                    </Card>

                    <Card size="sm">
                        <CardHeader>
                            <CardTitle>Pembayaran</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CopyableItem
                                text={
                                    withdrawal.user.wallet?.bank_account ?? '-'
                                }
                                label={`${withdrawal.user.wallet?.bank_name} - ${withdrawal.user.name}`}
                            />
                        </CardContent>
                    </Card>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
