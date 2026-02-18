import { FlashNotification } from '@/components/flash-notification';
import { Toaster } from '@/components/ui/sonner';
import { useRole } from '@/hooks/use-role';
import AppLayoutTemplateHeader from '@/layouts/app/app-header-layout';
import AppLayoutTemplateSidebar from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';

export default function AppLayout({
    children,
    breadcrumbs,
    ...props
}: AppLayoutProps) {
    const { isAdmin, isUser } = useRole();

    if (isAdmin()) {
        return (
            <AppLayoutTemplateSidebar breadcrumbs={breadcrumbs} {...props}>
                {children}
                <Toaster position="top-center" richColors />
                <FlashNotification />
            </AppLayoutTemplateSidebar>
        );
    }

    if (isUser()) {
        return (
            <AppLayoutTemplateHeader breadcrumbs={breadcrumbs} {...props}>
                {children}
                <Toaster position="top-center" richColors />
                <FlashNotification />
            </AppLayoutTemplateHeader>
        );
    }
}
