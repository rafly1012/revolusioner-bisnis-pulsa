import { Head, Form, Link, usePage, router } from '@inertiajs/react';
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
import type { BreadcrumbItem } from '@/types';
import type { Product } from '@/types';

export default function Edit() {
    const { product } = usePage<{ product: Product }>().props;
    const [openConfirm, setOpenConfirm] = useState(false);
    const [formData, setFormData] = useState({
        name: product.name ?? '',
        description: product.description ?? '',
        price: product.price ?? 0,
        image: null as File | null,
    });
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Produk',
            href: ProductsController.index().url,
        },
        {
            title: String(product.id),
            href: ProductsController.edit(product.id).url,
        },
        {
            title: 'Sunting',
            href: ProductsController.edit(product.id).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sunting Produk" />

            <AdminLayout>
                <div className="space-y-6">
                    <Heading variant="small" title="Sunting produk" />

                    <Form
                        {...ProductsController.update.form(product.id)}
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
                                            <FieldLabel htmlFor="name">
                                                Nama Produk
                                            </FieldLabel>
                                            <Input
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={formData.name}
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
                                                value={formData.description}
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
                                            </FieldLabel>
                                            <Input
                                                id="price"
                                                type="number"
                                                name="price"
                                                value={formData.price}
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
                                            <div>
                                                <img
                                                    src={`/${product.image}`}
                                                    alt={product.name}
                                                    className="aspect-square h-32 w-32 rounded-sm object-cover"
                                                />
                                            </div>
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

                    {/* Confirm Password Dialog */}
                    <ConfirmPasswordDialog
                        open={openConfirm}
                        onOpenChange={setOpenConfirm}
                        triggerHidden
                        onConfirm={(password) => {
                            const data = new FormData();
                            data.append('name', formData.name);
                            data.append('description', formData.description);
                            data.append('price', String(formData.price));
                            if (formData.image)
                                data.append('image', formData.image);
                            data.append('action_password', password);

                            router.put(
                                ProductsController.update(product.id).url,
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
