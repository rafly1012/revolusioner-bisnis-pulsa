import { Head, Link, usePage } from '@inertiajs/react';
import { Edit3 } from 'lucide-react';
import AnnouncementController from '@/actions/App/Http/Controllers/Admin/AnnouncementController';
import Heading from '@/components/heading';
import { ItemList } from '@/components/item-list';
import { Button } from '@/components/ui/button';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from '@/components/ui/item';
import AdminLayout from '@/layouts/admin/layout';
import AppLayout from '@/layouts/app-layout';
import type { Announcement, BreadcrumbItem } from '@/types';
import { Delete } from './delete';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengumuman',
        href: AnnouncementController.index().url,
    },
];

export default function Index() {
    const { announcements } = usePage<{ announcements: Announcement[] }>()
        .props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengumuman" />

            <AdminLayout>
                <div className="space-y-6">
                    <Heading variant="small" title="Pengumuman" />

                    <ItemList
                        data={announcements}
                        columns={[
                            {
                                key: 'name',
                                label: 'Nama',
                                searchable: true,
                            },
                        ]}
                        renderItem={(announcement) => (
                            <Item
                                key={announcement.id}
                                size="xs"
                                variant="outline"
                            >
                                <ItemContent className="gap-1">
                                    <ItemTitle>{announcement.title}</ItemTitle>
                                    <ItemDescription>
                                        {announcement.content}
                                    </ItemDescription>
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
                                                AnnouncementController.edit(
                                                    announcement.id,
                                                ).url
                                            }
                                        >
                                            <Edit3 />
                                        </Link>
                                    </Button>
                                    <Delete announcement={announcement} />
                                </ItemActions>
                            </Item>
                        )}
                        perPage={10}
                        onAdd={
                            <Button size="sm" asChild>
                                <Link
                                    href={AnnouncementController.create().url}
                                >
                                    Buat
                                </Link>
                            </Button>
                        }
                    />
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
