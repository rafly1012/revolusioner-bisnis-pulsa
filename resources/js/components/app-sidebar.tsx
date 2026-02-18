import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    Users,
    Package,
    BadgeCent,
    HandCoins,
    Megaphone,
} from 'lucide-react';
import AnnouncementController from '@/actions/App/Http/Controllers/Admin/AnnouncementController';
import ProductsController from '@/actions/App/Http/Controllers/Admin/ProductsController';
import TransactionsController from '@/actions/App/Http/Controllers/Admin/TransactionsController';
import UsersController from '@/actions/App/Http/Controllers/Admin/UsersController';
import WithdrawalController from '@/actions/App/Http/Controllers/Admin/WithdrawalsController';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes/admin';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Pengguna',
        href: UsersController.index().url,
        icon: Users,
    },
    {
        title: 'Produk',
        href: ProductsController.index().url,
        icon: Package,
    },
    {
        title: 'Pengumuman',
        href: AnnouncementController.index().url,
        icon: Megaphone,
    },
    {
        title: 'Transaksi',
        href: TransactionsController.index().url,
        icon: BadgeCent,
    },
    {
        title: 'Penarikan',
        href: WithdrawalController.index().url,
        icon: HandCoins,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="offcanvas" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
