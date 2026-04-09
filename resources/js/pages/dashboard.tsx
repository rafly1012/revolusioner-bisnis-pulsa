import { Head, usePage } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/layouts/admin/layout';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

export interface Overview {
    total_revenue: {
        value: number;
        formatted: string;
    };
    total_transactions: {
        value: number;
        formatted: string;
    };
    total_products_sold: {
        value: number;
        formatted: string;
    };
    total_customers: {
        value: number;
        formatted: string;
    };
    total_admin_fee: {
        value: number;
        formatted: string;
    };
    total_withdrawals: {
        value: number;
        formatted: string;
    };
}

export interface DashboardPageProps {
    overview: Overview;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Admin',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { overview } = usePage<DashboardPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AdminLayout>
                <Head title="Dashboard Admin" />

                <div className="space-y-2">
                    <Heading title="Dashboard Admin" />
                    {/* Overview */}
                    <div className="grid gap-2">
                        <div className="grid gap-2 md:grid-cols-3">
                            <OverviewCard
                                title="Total Admin Fee"
                                value={overview.total_admin_fee.formatted}
                            />
                            <OverviewCard
                                title="Total Penjualan"
                                value={overview.total_revenue.formatted}
                            />
                            <OverviewCard
                                title="Total Penarikan"
                                value={overview.total_withdrawals.formatted}
                            />
                        </div>

                        <Separator className="my-2" />

                        <div className="grid gap-2 md:grid-cols-4">
                            <OverviewCard
                                title="Total Transaksi"
                                value={overview.total_transactions.formatted}
                            />
                            <OverviewCard
                                title="Produk Terjual"
                                value={overview.total_products_sold.formatted}
                            />
                            <OverviewCard
                                title="Produk Terjual"
                                value={overview.total_products_sold.formatted}
                                items={overview.products_sold_list}
                            />
                            <OverviewCard
                                title="Total Pengguna"
                                value={overview.total_customers.formatted}
                            />
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}

function OverviewCard({
    title,
    value,
    items,
}: {
    title: string;
    value: string;
    items?: { name: string; qty: number }[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-2 text-2xl font-bold">{value}</div>

                {items && (
                    <div className="text-sm text-muted-foreground space-y-1">
                        {items.map((item, i) => (
                            <div key={i} className="flex justify-between">
                                <span>{item.name}</span>
                                <span>{item.qty}</span>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
