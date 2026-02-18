import { Head, Form, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import ProductsController from '@/actions/App/Http/Controllers/Admin/ProductsController';
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
import { store } from '@/routes/admin/products';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Produk',
        href: ProductsController.index().url,
    },
    {
        title: 'Buat',
        href: ProductsController.index().url,
    },
];

export default function Create() {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        image: null as File | null,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Produk" />

            <AdminLayout>
                <div className="space-y-6">
                    <Heading variant="small" title="Buat produk" />

                    <Form {...store.form()} disableWhileProcessing>
                        {({ processing, errors }) => (
                            <FieldGroup>
                                <FieldSet>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="name">
                                                Nama Produk
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </FieldLabel>
                                            <Input
                                                id="name"
                                                type="text"
                                                name="name"
                                                required
                                                autoFocus
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />
                                            <InputError
                                                message={errors.name}
                                                className="mt-2"
                                            />
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="description">
                                                Deskripsi
                                            </FieldLabel>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                required
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                            <InputError
                                                message={errors.description}
                                                className="mt-2"
                                            />
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="price">
                                                Harga (Rp)
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </FieldLabel>
                                            <Input
                                                id="price"
                                                type="number"
                                                name="price"
                                                required
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        price: Number(
                                                            e.target.value,
                                                        ),
                                                    })
                                                }
                                            />
                                            <InputError
                                                message={errors.price}
                                                className="mt-2"
                                            />
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="image">
                                                Gambar
                                            </FieldLabel>
                                            <Input
                                                id="image"
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                required
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        image:
                                                            e.target
                                                                .files?.[0] ??
                                                            null,
                                                    })
                                                }
                                            />
                                            <InputError
                                                message={errors.image}
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
                                                    ProductsController.index()
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
                                ProductsController.store().url,
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
