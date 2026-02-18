import { Head, usePage } from '@inertiajs/react';
import WithdrawalController from '@/actions/App/Http/Controllers/Users/WithdrawalController';
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
    ItemDescription,
    ItemTitle,
} from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import UsersLayout from '@/layouts/users/layout';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import type { BreadcrumbItem, SharedData, Withdrawal } from '@/types';

export default function Show() {
    const { auth } = usePage<SharedData>().props;
    const { withdrawal } = usePage<{ withdrawal: Withdrawal }>().props;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Penarikan',
            href: WithdrawalController.index().url,
        },
        {
            title: String(withdrawal.id),
            href: WithdrawalController.show(withdrawal.id).url,
        },
    ];

    const message = encodeURIComponent(
        `Halo Admin, saya ingin melakukan penarikan.\n\n` +
            `Nama: *${auth.user.name}*\n` +
            `Email: *${auth.user.email}*\n` +
            `Kode Penarikan: *${withdrawal.withdrawal_code}*\n\n` +
            `Total Penarikan: *${formatCurrency(withdrawal.amount)}*\n\n`,
    );

    const whatsappUrl = `https://api.whatsapp.com/send?phone=6281246074353&text=${message}`;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Penarikan" />

            <UsersLayout>
                <div className="space-y-6">
                    <Heading variant="small" title="Detail Penarikan" />

                    <Card size="sm">
                        <CardHeader>
                            <CardTitle>Detail Pesanan</CardTitle>
                            <CardDescription>
                                {formatDateTime(withdrawal.created_at)}
                            </CardDescription>
                            <CardAction>
                                <Statuses status={withdrawal.status} />
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <Item variant="muted" size="xs">
                                <ItemContent>
                                    <ItemDescription>
                                        Total Penarikan
                                    </ItemDescription>
                                    <ItemTitle>
                                        {formatCurrency(withdrawal.amount)}
                                    </ItemTitle>
                                </ItemContent>
                            </Item>

                            <Separator className="my-2" />

                            <CopyableItem
                                label="Kode Penarikan"
                                text={withdrawal.withdrawal_code}
                            />
                        </CardContent>
                    </Card>

                    <Card size="sm">
                        <CardHeader>
                            <CardTitle>Penarikan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button size="sm" className="w-full" asChild>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Kirim pesan penarikan ke admin
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </UsersLayout>
        </AppLayout>
    );
}
