import { Head, Form, Link, router } from '@inertiajs/react';
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
import { store } from '@/routes/admin/announcements';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengumuman',
        href: AnnouncementController.index().url,
    },
    {
        title: 'Buat',
        href: AnnouncementController.index().url,
    },
];

export default function Create() {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Pengumuman" />

            <AdminLayout>
                <div className="space-y-6">
                    <Heading variant="small" title="Buat pengumuman" />

                    <Form {...store.form()} disableWhileProcessing>
                        {({ processing, errors }) => (
                            <FieldGroup>
                                <FieldSet>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="title">
                                                Judul Pengumuman
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </FieldLabel>
                                            <Input
                                                id="title"
                                                type="text"
                                                name="title"
                                                required
                                                autoFocus
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
                                                required
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
                                            disabled={processing}
                                            onClick={() => setOpenConfirm(true)}
                                        >
                                            {processing && <Spinner />}
                                            Simpan
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

                    <ConfirmPasswordDialog
                        open={openConfirm}
                        onOpenChange={setOpenConfirm}
                        triggerHidden
                        onConfirm={(password) => {
                            router.post(
                                AnnouncementController.store().url,
                                {
                                    ...formData,
                                    action_password: password,
                                },
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
