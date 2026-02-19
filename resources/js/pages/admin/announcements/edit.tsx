import { Head, Form, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import AnnouncementController from '@/actions/App/Http/Controllers/Admin/AnnouncementController';
import { ConfirmPasswordDialog } from '@/components/confirm-password-dialog';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin/layout';
import AppLayout from '@/layouts/app-layout';
import type { Announcement, BreadcrumbItem } from '@/types';

export default function Edit() {
    const { announcement } = usePage<{ announcement: Announcement }>().props;
    const [openConfirm, setOpenConfirm] = useState(false);
    const [formData, setFormData] = useState({
        title: announcement.title ?? '',
        content: announcement.content ?? '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Pengumuman',
            href: AnnouncementController.index().url,
        },
        {
            title: String(announcement.id),
            href: AnnouncementController.edit(announcement.id).url,
        },
        {
            title: 'Sunting',
            href: AnnouncementController.edit(announcement.id).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sunting Pengumuman" />

            <AdminLayout>
                <div className="space-y-6">
                    <Heading variant="small" title="Sunting pengumuman" />

                    <Form
                        {...AnnouncementController.update.form(announcement.id)}
                        options={{
                            preserveScroll: true,
                        }}
                        disableWhileProcessing
                    >
                        {({ processing, errors }) => (
                            <FieldGroup>
                                <FieldSet>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="title">
                                                Judul Pengumuman
                                            </FieldLabel>
                                            <Input
                                                id="title"
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        title: e.target.value,
                                                    })
                                                }
                                            />
                                            <InputError
                                                message={errors.title}
                                                className="mt-2"
                                            />
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="content">
                                                Konten
                                            </FieldLabel>
                                            <Textarea
                                                id="content"
                                                name="content"
                                                value={formData.content}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        content: e.target.value,
                                                    })
                                                }
                                            />
                                            <InputError
                                                message={errors.content}
                                                className="mt-2"
                                            />
                                        </Field>
                                    </FieldGroup>

                                    <Field orientation="horizontal">
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={() => setOpenConfirm(true)}
                                            disabled={processing}
                                        >
                                            {processing && <Spinner />}
                                            Perbarui
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link
                                                href={
                                                    AnnouncementController.index()
                                                        .url
                                                }
                                            >
                                                Kembali
                                            </Link>
                                        </Button>
                                    </Field>
                                </FieldSet>
                            </FieldGroup>
                        )}
                    </Form>

                    {/* Confirm Password Dialog */}
                    <ConfirmPasswordDialog
                        open={openConfirm}
                        onOpenChange={setOpenConfirm}
                        triggerHidden
                        onConfirm={(password) => {
                            const data = new FormData();
                            data.append('_method', 'put');
                            data.append('title', formData.title);
                            data.append('content', formData.content);
                            data.append('action_password', password);

                            router.post(
                                AnnouncementController.update(announcement.id)
                                    .url,
                                data,
                                {
                                    onSuccess: () => setOpenConfirm(false),
                                },
                            );
                        }}
                    />
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
