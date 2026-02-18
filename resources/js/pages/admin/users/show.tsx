import { Head, usePage, Link } from '@inertiajs/react';
import {
    TrendingUp,
    TrendingDown,
    BadgeCheck,
    Copy,
    Check,
    Calendar,
    Mail,
    User as UserIcon,
    Wallet,
    ShoppingCart,
    CreditCard,
    ChevronDown,
    ExternalLink,
    PhoneCall,
    Zap,
} from 'lucide-react';
import UsersController from '@/actions/App/Http/Controllers/Admin/UsersController';
import { Badge } from '@/components/ui/badge';
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
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useClipboard } from '@/hooks/use-clipboard';
import AdminLayout from '@/layouts/admin/layout';
import AppLayout from '@/layouts/app-layout';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';
import { EditPassword } from './edit-password';
import { EditWallet } from './edit-wallet';

type User = {
    id: number;
    name: string;
    email: string;
    referral_code: string;
    phone: string;
    electricity: string;
    created_at: string;
    wallet?: {
        id: number;
        balance: number;
        bank_name: number;
        bank_account: number;
        logs: WalletLog[];
    };
    transactions: Transaction[];
    withdrawals: Withdrawal[];
};

type WalletLog = {
    id: number;
    amount: number;
    description: string;
    created_at: string;
};

type Transaction = {
    id: number;
    total: number;
    status: string;
    created_at: string;
    details: DetailTransaction[];
};

type DetailTransaction = {
    id: number;
    product: {
        id: number;
        name: string;
        price: number;
    };
    qty: number;
    price: number;
    subtotal: number;
};

type Withdrawal = {
    id: number;
    amount: number;
    status: string;
    bank_name: string;
    bank_account: string;
    created_at: string;
};

type UplineItem = {
    level: number;
    user: {
        id: number;
        name: string;
        email: string;
        referral_code: string;
    };
};

type DownlineItem = {
    id: number;
    name: string;
    email: string;
    referral_code: string;
    level: number;
    children: DownlineItem[];
};

type PageProps = {
    user: User;
    data: {
        user: {
            id: number;
            name: string;
            email: string;
            referral_code: string;
            phone: string;
            electricity: string;
            created_at: string;
        };
        upline: UplineItem[];
        downline: DownlineItem[];
        stats: {
            by_level: Record<number, number>;
            total: number;
        };
        rank: string;
    };
};

const StatusBadge = ({ status }: { status: string }) => {
    const variants: Record<string, { variant: any; label: string }> = {
        pending: { variant: 'secondary', label: 'Pending' },
        approved: { variant: 'default', label: 'Approved' },
        rejected: { variant: 'destructive', label: 'Rejected' },
        completed: { variant: 'default', label: 'Completed' },
    };

    const config = variants[status] || variants.pending;

    return <Badge variant={config.variant}>{config.label}</Badge>;
};

export default function Show() {
    const { data, user: userData } = usePage<PageProps>().props;
    const { user, upline, downline, stats, rank } = data;
    const [copiedText, copy] = useClipboard();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: UsersController.index().url,
        },
        {
            title: user.name,
            href: UsersController.show(user.id).url,
        },
    ];

    const renderDownlineTree = (items: DownlineItem[]) => {
        if (!items || items.length === 0) return null;

        return (
            <ItemGroup className="space-y-2">
                {items.map((item) => {
                    const hasChildren =
                        item.children && item.children.length > 0;

                    if (hasChildren) {
                        return (
                            <Collapsible key={item.id}>
                                <CollapsibleTrigger asChild>
                                    <Item
                                        size="xs"
                                        variant="muted"
                                        className="group"
                                    >
                                        <ItemMedia variant="icon">
                                            <Button
                                                variant="outline"
                                                size="icon-xs"
                                                className="rounded-full"
                                            >
                                                {item.level}
                                            </Button>
                                        </ItemMedia>
                                        <ItemContent>
                                            <ItemTitle>{item.name}</ItemTitle>
                                            <ItemDescription>
                                                {item.email}
                                            </ItemDescription>
                                            <ItemTitle className="font-mono text-xs">
                                                {item.referral_code}
                                            </ItemTitle>
                                        </ItemContent>
                                        <ItemActions>
                                            <Button
                                                variant="outline"
                                                size="icon-sm"
                                                className="rounded-full"
                                                asChild
                                            >
                                                <Link
                                                    href={
                                                        UsersController.show(
                                                            item.id,
                                                        ).url
                                                    }
                                                >
                                                    <ExternalLink className="size-4" />
                                                </Link>
                                            </Button>
                                        </ItemActions>
                                        <ItemActions>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="rounded-full"
                                            >
                                                {item.children.length}
                                                <ChevronDown className="transition-transform group-data-[state=open]:rotate-90" />
                                            </Button>
                                        </ItemActions>
                                    </Item>
                                </CollapsibleTrigger>

                                <CollapsibleContent className="mt-4 ml-0 border-l pl-4">
                                    {renderDownlineTree(item.children)}
                                </CollapsibleContent>
                            </Collapsible>
                        );
                    }

                    return (
                        <Item key={item.id} size="xs" variant="outline">
                            <ItemMedia variant="icon">
                                <Button
                                    variant="outline"
                                    size="icon-xs"
                                    className="rounded-full"
                                >
                                    {item.level}
                                </Button>
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>{item.name}</ItemTitle>
                                <ItemDescription>{item.email}</ItemDescription>
                                <ItemTitle className="font-mono text-xs">
                                    {item.referral_code}
                                </ItemTitle>
                            </ItemContent>
                            <ItemActions>
                                <Button
                                    variant="outline"
                                    size="icon-sm"
                                    className="rounded-full"
                                    asChild
                                >
                                    <Link
                                        href={UsersController.show(item.id).url}
                                    >
                                        <ExternalLink className="size-4" />
                                    </Link>
                                </Button>
                            </ItemActions>
                        </Item>
                    );
                })}
            </ItemGroup>
        );
    };

    const ReferralCodeCopy = copiedText === user.referral_code ? Check : Copy;
    const BankAccountCopy =
        copiedText === String(userData.wallet?.bank_account) ? Check : Copy;
    const ElectricityCopy =
        copiedText === String(userData.electricity) ? Check : Copy;

    const totalDownline = stats.total || 0;

    const message = encodeURIComponent(
        `Halo ${user.name}, saya Admin Revolusioner Bisnis Pulsa.\n\n`,
    );

    const whatsappUrl = `https://api.whatsapp.com/send?phone=62${userData.phone}&text=${message}`;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={user.name} />

            <AdminLayout>
                <div className="space-y-2">
                    {/* User Info Card */}
                    <Card size="sm">
                        <CardHeader>
                            <CardTitle>Informasi User</CardTitle>
                            <CardDescription>
                                Detail informasi akun pengguna
                            </CardDescription>
                            <CardAction className="space-x-0.5">
                                <Button variant="outline" size="sm">
                                    {rank}
                                </Button>
                                <EditPassword userData={userData} />
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                <Item variant="muted" size="xs">
                                    <ItemMedia variant="icon">
                                        <UserIcon data-icon="inline-start" />
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemDescription>
                                            Nama lengkap
                                        </ItemDescription>
                                        <ItemTitle>{user.name}</ItemTitle>
                                    </ItemContent>
                                </Item>

                                <Item variant="muted" size="xs">
                                    <ItemMedia variant="icon">
                                        <Mail data-icon="inline-start" />
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemDescription>Email</ItemDescription>
                                        <ItemTitle>{user.email}</ItemTitle>
                                    </ItemContent>
                                </Item>

                                <Item variant="muted" size="xs">
                                    <ItemMedia variant="icon">
                                        <BadgeCheck data-icon="inline-start" />
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemDescription>
                                            Kode referral
                                        </ItemDescription>
                                        <ItemTitle className="font-mono">
                                            {user.referral_code}
                                        </ItemTitle>
                                    </ItemContent>
                                    <ItemActions>
                                        <Button
                                            variant="outline"
                                            size="icon-sm"
                                            onClick={() =>
                                                copy(user.referral_code)
                                            }
                                        >
                                            <ReferralCodeCopy />
                                        </Button>
                                    </ItemActions>
                                </Item>

                                <Item variant="muted" size="xs">
                                    <ItemMedia variant="icon">
                                        <Wallet data-icon="inline-start" />
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemDescription>
                                            {userData.wallet?.bank_name}
                                        </ItemDescription>
                                        <ItemTitle className="font-mono">
                                            {userData.wallet?.bank_account}
                                        </ItemTitle>
                                    </ItemContent>
                                    <ItemActions>
                                        <Button
                                            variant="outline"
                                            size="icon-sm"
                                            onClick={() =>
                                                copy(
                                                    String(
                                                        userData.wallet
                                                            ?.bank_account,
                                                    ),
                                                )
                                            }
                                        >
                                            <BankAccountCopy />
                                        </Button>
                                        <EditWallet userData={userData} />
                                    </ItemActions>
                                </Item>

                                <Item variant="muted" size="xs">
                                    <ItemMedia variant="icon">
                                        <PhoneCall data-icon="inline-start" />
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemDescription>
                                            Nomor Telepon
                                        </ItemDescription>
                                        <ItemTitle>{userData.phone}</ItemTitle>
                                    </ItemContent>
                                    <ItemActions>
                                        <Button
                                            variant="outline"
                                            size="icon-sm"
                                            asChild
                                        >
                                            <a
                                                href={whatsappUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <PhoneCall />
                                            </a>
                                        </Button>
                                    </ItemActions>
                                </Item>

                                <Item variant="muted" size="xs">
                                    <ItemMedia variant="icon">
                                        <Zap data-icon="inline-start" />
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemDescription>
                                            Nomor Token Listrik
                                        </ItemDescription>
                                        <ItemTitle>
                                            {userData.electricity}
                                        </ItemTitle>
                                    </ItemContent>
                                    <ItemActions>
                                        <Button
                                            variant="outline"
                                            size="icon-sm"
                                            onClick={() =>
                                                copy(
                                                    String(
                                                        userData.electricity,
                                                    ),
                                                )
                                            }
                                        >
                                            <ElectricityCopy />
                                        </Button>
                                    </ItemActions>
                                </Item>

                                <Item variant="muted" size="xs">
                                    <ItemMedia variant="icon">
                                        <Calendar data-icon="inline-start" />
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemDescription>
                                            Bergabung pada
                                        </ItemDescription>
                                        <ItemTitle>
                                            {formatDateTime(user.created_at)}
                                        </ItemTitle>
                                    </ItemContent>
                                </Item>
                            </div>
                        </CardContent>
                    </Card>

                    <Separator className="my-4" />

                    {/* Stats Cards */}
                    <ItemGroup className="grid md:grid-cols-2">
                        <Item size="xs" variant="outline">
                            <Item size="sm" className="p-0">
                                <ItemContent>
                                    <ItemTitle>Saldo Wallet</ItemTitle>
                                </ItemContent>
                                <ItemActions>
                                    <Button
                                        variant="secondary"
                                        size="icon-sm"
                                        className="rounded-full"
                                    >
                                        <Wallet />
                                    </Button>
                                </ItemActions>
                            </Item>
                            <Item size="sm" className="p-0">
                                <ItemContent>
                                    <ItemTitle>
                                        {formatCurrency(
                                            userData.wallet?.balance || 0,
                                        )}
                                    </ItemTitle>
                                    <ItemDescription>
                                        {userData.wallet?.logs.length || 0} log
                                        transaksi
                                    </ItemDescription>
                                </ItemContent>
                            </Item>
                        </Item>

                        <Item size="xs" variant="outline">
                            <Item size="xs" className="p-0">
                                <ItemContent>
                                    <ItemTitle>Total Transaksi</ItemTitle>
                                </ItemContent>
                                <ItemActions>
                                    <Button
                                        variant="secondary"
                                        size="icon-sm"
                                        className="rounded-full"
                                    >
                                        <ShoppingCart />
                                    </Button>
                                </ItemActions>
                            </Item>
                            <Item size="xs" className="p-0">
                                <ItemContent>
                                    <ItemTitle>
                                        {userData.transactions?.length || 0}
                                    </ItemTitle>
                                    <ItemDescription>
                                        {formatCurrency(
                                            userData.transactions?.reduce(
                                                (sum, t) => sum + t.total,
                                                0,
                                            ) || 0,
                                        )}
                                    </ItemDescription>
                                </ItemContent>
                            </Item>
                        </Item>

                        <Item size="xs" variant="outline">
                            <Item size="xs" className="p-0">
                                <ItemContent>
                                    <ItemTitle>Penarikan</ItemTitle>
                                </ItemContent>
                                <ItemActions>
                                    <Button
                                        variant="secondary"
                                        size="icon-sm"
                                        className="rounded-full"
                                    >
                                        <CreditCard />
                                    </Button>
                                </ItemActions>
                            </Item>
                            <Item size="xs" className="p-0">
                                <ItemContent>
                                    <ItemTitle>
                                        {userData.withdrawals?.length || 0}
                                    </ItemTitle>
                                    <ItemDescription>
                                        {formatCurrency(
                                            userData.withdrawals?.reduce(
                                                (sum, w) => sum + w.amount,
                                                0,
                                            ) || 0,
                                        )}
                                    </ItemDescription>
                                </ItemContent>
                            </Item>
                        </Item>

                        <Item size="xs" variant="outline">
                            <Item size="xs" className="p-0">
                                <ItemContent>
                                    <ItemTitle>Total Referral</ItemTitle>
                                </ItemContent>
                                <ItemActions>
                                    <Button
                                        variant="secondary"
                                        size="icon-sm"
                                        className="rounded-full"
                                    >
                                        <TrendingDown />
                                    </Button>
                                </ItemActions>
                            </Item>
                            <Item size="xs" className="p-0">
                                <ItemContent>
                                    <ItemTitle>{totalDownline}</ItemTitle>
                                    <ItemDescription>
                                        {Object.keys(stats.by_level).length}{' '}
                                        level aktif
                                    </ItemDescription>
                                </ItemContent>
                            </Item>
                        </Item>
                    </ItemGroup>

                    {/* Referral Levels */}
                    <Card size="sm">
                        <CardHeader>
                            <CardTitle>Statistik Level Referral</CardTitle>
                            <CardDescription>
                                Distribusi downline per level
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ItemGroup className="grid grid-cols-2 gap-2 md:grid-cols-5">
                                {Object.entries(stats.by_level).map(
                                    ([level, count]) => (
                                        <Item
                                            key={level}
                                            size="xs"
                                            variant="outline"
                                        >
                                            <ItemContent>
                                                <ItemDescription>
                                                    Level {level}
                                                </ItemDescription>
                                            </ItemContent>
                                            <ItemContent>
                                                <ItemTitle>{count}</ItemTitle>
                                            </ItemContent>
                                        </Item>
                                    ),
                                )}
                            </ItemGroup>
                        </CardContent>
                    </Card>

                    {/* Tabs untuk Wallet, Transactions, Withdrawals */}
                    <Tabs defaultValue="wallet" className="w-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="wallet">
                                <Wallet />
                                Dompet
                            </TabsTrigger>
                            <TabsTrigger value="transactions">
                                <ShoppingCart />
                                Transaksi
                            </TabsTrigger>
                            <TabsTrigger value="withdrawals">
                                <CreditCard />
                                Penarikan
                            </TabsTrigger>
                            <TabsTrigger value="referrals">
                                <TrendingDown />
                                Referral
                            </TabsTrigger>
                        </TabsList>

                        {/* Wallet Tab */}
                        <TabsContent value="wallet">
                            <Card size="sm">
                                <CardHeader>
                                    <CardTitle>Riwayat Wallet</CardTitle>
                                    <CardDescription>
                                        Log transaksi wallet pengguna
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {userData.wallet?.logs &&
                                    userData.wallet.logs.length > 0 ? (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>
                                                        Tanggal
                                                    </TableHead>
                                                    <TableHead>
                                                        Deskripsi
                                                    </TableHead>
                                                    <TableHead className="text-right">
                                                        Jumlah
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {userData.wallet.logs.map(
                                                    (log) => (
                                                        <TableRow key={log.id}>
                                                            <TableCell>
                                                                {formatDateTime(
                                                                    log.created_at,
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    log.description
                                                                }
                                                            </TableCell>
                                                            <TableCell className="text-right font-medium">
                                                                {formatCurrency(
                                                                    log.amount,
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ),
                                                )}
                                            </TableBody>
                                        </Table>
                                    ) : (
                                        <div className="py-8 text-center">
                                            <Wallet className="mx-auto mb-3 size-12 text-muted-foreground opacity-50" />
                                            <p className="text-sm text-muted-foreground">
                                                Belum ada riwayat wallet
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Transactions Tab */}
                        <TabsContent value="transactions">
                            <Card size="sm">
                                <CardHeader>
                                    <CardTitle>Riwayat Transaksi</CardTitle>
                                    <CardDescription>
                                        Semua transaksi pembelian
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {userData.transactions &&
                                    userData.transactions.length > 0 ? (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>
                                                        Tanggal
                                                    </TableHead>
                                                    <TableHead>
                                                        Status
                                                    </TableHead>
                                                    <TableHead>
                                                        Produk
                                                    </TableHead>
                                                    <TableHead className="text-right">
                                                        Total
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {userData.transactions.map(
                                                    (transaction) => (
                                                        <TableRow
                                                            key={transaction.id}
                                                        >
                                                            <TableCell>
                                                                {formatDateTime(
                                                                    transaction.created_at,
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                <StatusBadge
                                                                    status={
                                                                        transaction.status
                                                                    }
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <ul className="space-y-1">
                                                                    {transaction.details.map(
                                                                        (
                                                                            detail,
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    detail.id
                                                                                }
                                                                            >
                                                                                {
                                                                                    detail
                                                                                        .product
                                                                                        .name
                                                                                }{' '}
                                                                                (
                                                                                {
                                                                                    detail.qty
                                                                                }{' '}
                                                                                x{' '}
                                                                                {formatCurrency(
                                                                                    detail.price,
                                                                                )}

                                                                                )
                                                                            </li>
                                                                        ),
                                                                    )}
                                                                </ul>
                                                            </TableCell>
                                                            <TableCell className="text-right font-medium">
                                                                {formatCurrency(
                                                                    transaction.total,
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ),
                                                )}
                                            </TableBody>
                                        </Table>
                                    ) : (
                                        <div className="py-8 text-center">
                                            <ShoppingCart className="mx-auto mb-3 size-12 text-muted-foreground opacity-50" />
                                            <p className="text-sm text-muted-foreground">
                                                Belum ada transaksi
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Withdrawals Tab */}
                        <TabsContent value="withdrawals">
                            <Card size="sm">
                                <CardHeader>
                                    <CardTitle>Riwayat Penarikan</CardTitle>
                                    <CardDescription>
                                        Semua permintaan penarikan dana
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {userData.withdrawals &&
                                    userData.withdrawals.length > 0 ? (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>
                                                        Tanggal
                                                    </TableHead>
                                                    <TableHead>
                                                        Status
                                                    </TableHead>
                                                    <TableHead className="text-right">
                                                        Jumlah
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {userData.withdrawals.map(
                                                    (withdrawal) => (
                                                        <TableRow
                                                            key={withdrawal.id}
                                                        >
                                                            <TableCell>
                                                                {formatDateTime(
                                                                    withdrawal.created_at,
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                <StatusBadge
                                                                    status={
                                                                        withdrawal.status
                                                                    }
                                                                />
                                                            </TableCell>
                                                            <TableCell className="text-right font-medium">
                                                                {formatCurrency(
                                                                    withdrawal.amount,
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ),
                                                )}
                                            </TableBody>
                                        </Table>
                                    ) : (
                                        <div className="py-8 text-center">
                                            <CreditCard className="mx-auto mb-3 size-12 text-muted-foreground opacity-50" />
                                            <p className="text-sm text-muted-foreground">
                                                Belum ada penarikan
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Referrals Tab */}
                        <TabsContent value="referrals" className="space-y-2">
                            <Card size="sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="size-5" />
                                        Upline Chain
                                    </CardTitle>
                                    <CardDescription>
                                        {upline.length > 0
                                            ? `${upline.length} level(s) upline`
                                            : 'No upline found'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {upline.length > 0 ? (
                                        <ItemGroup>
                                            {upline.map((item) => (
                                                <Item
                                                    key={item.level}
                                                    size="xs"
                                                    variant="muted"
                                                >
                                                    <ItemMedia variant="icon">
                                                        <Button
                                                            variant="outline"
                                                            size="icon-xs"
                                                            className="rounded-full"
                                                        >
                                                            {item.level}
                                                        </Button>
                                                    </ItemMedia>
                                                    <ItemContent>
                                                        <ItemTitle>
                                                            {item.user.name}
                                                        </ItemTitle>
                                                        <ItemDescription>
                                                            {item.user.email}
                                                        </ItemDescription>
                                                        <ItemTitle className="font-mono text-xs">
                                                            {
                                                                item.user
                                                                    .referral_code
                                                            }
                                                        </ItemTitle>
                                                    </ItemContent>
                                                    <ItemActions>
                                                        <Button
                                                            variant="outline"
                                                            size="icon-sm"
                                                            className="rounded-full"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={
                                                                    UsersController.show(
                                                                        item
                                                                            .user
                                                                            .id,
                                                                    ).url
                                                                }
                                                            >
                                                                <ExternalLink className="size-4" />
                                                            </Link>
                                                        </Button>
                                                    </ItemActions>
                                                </Item>
                                            ))}
                                        </ItemGroup>
                                    ) : (
                                        <div className="py-8 text-center">
                                            <TrendingUp className="mx-auto mb-3 size-12 text-muted-foreground opacity-50" />
                                            <p className="text-sm text-muted-foreground">
                                                This user has no upline
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingDown className="size-5" />
                                        Downline Tree
                                    </CardTitle>
                                    <CardDescription>
                                        {totalDownline > 0
                                            ? `${totalDownline} total referral(s)`
                                            : 'No downline found'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {downline.length > 0 ? (
                                        <ItemGroup>
                                            {renderDownlineTree(downline)}
                                        </ItemGroup>
                                    ) : (
                                        <div className="py-8 text-center">
                                            <TrendingDown className="mx-auto mb-3 size-12 text-muted-foreground opacity-50" />
                                            <p className="text-sm text-muted-foreground">
                                                This user has no downline
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
