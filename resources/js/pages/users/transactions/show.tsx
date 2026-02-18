import { Head, usePage } from '@inertiajs/react';
import TransactionsController from '@/actions/App/Http/Controllers/Users/TransactionsController';
import { CopyableItem } from '@/components/copyable-item';
import Heading from '@/components/heading';
import { Statuses } from '@/components/statuses';
import { Button } from '@/components/ui/button';
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
    ItemDescription,
} from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import UsersLayout from '@/layouts/users/layout';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import type { BreadcrumbItem, SharedData, Transaction } from '@/types';

export default function Show() {
    const { auth } = usePage<SharedData>().props;
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

    const productsText = transaction.details
        .map(
            (detail) =>
                `- ${detail.product.name} (${detail.qty}x) = ${formatCurrency(
                    detail.subtotal,
                )}`,
        )
        .join('\n');

    const message = encodeURIComponent(
        `Halo Admin, saya sudah melakukan pembayaran.\n\n` +
            `Nama: *${auth.user.name}*\n` +
            `Email: *${auth.user.email}*\n` +
            `Kode Transaksi: *${transaction.transaction_code}*\n\n` +
            `Produk:\n${productsText}\n\n` +
            `Total Pembayaran: *${formatCurrency(transaction.total)}*\n\n` +
            `Berikut bukti pembayarannya. Terima kasih.`,
    );

    const whatsappUrl = `https://api.whatsapp.com/send?phone=6281246074353&text=${message}`;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Transaksi" />

            <UsersLayout>
                <div className="space-y-6">
                    <Heading variant="small" title="Detail transaksi" />

                    <Card size="sm">
                        <CardHeader>
                            <CardTitle>Detail Pesanan</CardTitle>
                            <CardDescription>
                                {formatDateTime(transaction.created_at)}
                            </CardDescription>
                            <CardAction>
                                <Statuses status={transaction.status} />
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
                                            <ItemDescription>
                                                {detail.product.name}
                                            </ItemDescription>
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
                                        <ItemDescription>
                                            Total Pembayaran
                                        </ItemDescription>
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

                    <Card size="sm">
                        <CardHeader>
                            <CardTitle>Pembayaran</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                <CopyableItem
                                    text="3140818100"
                                    label="BCA - JEMY JERMIAS HANING"
                                />
                                <CopyableItem
                                    text="0220919580"
                                    label="BNI - JEMY JERMIAS HANING"
                                />
                            </div>
                            <Separator className="my-2" />

                            <div className="space-y-2">
                                <img
                                    src="/public/img/bca.jpeg"
                                    alt="QRIS BCA"
                                    className="rounded-xl border"
                                />
                                <Button size="sm" className="w-full" asChild>
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Kirim bukti pembayaran ke admin
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </UsersLayout>
        </AppLayout>
    );
}
