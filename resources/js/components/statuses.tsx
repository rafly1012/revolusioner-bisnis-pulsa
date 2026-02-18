import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
    status: 'pending' | 'approved' | 'rejected' | string;
};

export function Statuses({ status }: Props) {
    const config: Record<
        string,
        { icon: React.ReactNode; className: string; label: string }
    > = {
        pending: {
            icon: <Clock data-icon="inline-start" />,
            label: 'Tertunda',
            className:
                'text-yellow-700 bg-yellow-100 dark:bg-yellow-950 dark:text-yellow-300',
        },
        approved: {
            icon: <CheckCircle data-icon="inline-start" />,
            label: 'Disetujui',
            className:
                'text-green-700 bg-green-100 dark:bg-green-950 dark:text-green-300',
        },
        rejected: {
            icon: <XCircle data-icon="inline-start" />,
            label: 'Ditolak',
            className:
                'text-red-700 bg-red-100 dark:bg-red-950 dark:text-red-300',
        },
    };

    const item = config[status] ?? {
        icon: <Clock data-icon="inline-start" />,
        label: status,
        className:
            'text-gray-700 bg-gray-100 dark:bg-gray-900 dark:text-gray-300',
    };

    return (
        <div
            className={cn(
                "inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md px-3 text-sm font-medium whitespace-nowrap transition-all outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                item.className,
            )}
        >
            {item.icon}
            {item.label}
        </div>
    );
}
