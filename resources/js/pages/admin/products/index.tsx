import { Head, Link, usePage } from '@inertiajs/react';
import { Edit3 } from 'lucide-react';
import ProductsController from '@/actions/App/Http/Controllers/Admin/ProductsController';
import Heading from '@/components/heading';
import { ItemList } from '@/components/item-list';
import { Button } from '@/components/ui/button';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemHeader,
    ItemTitle,
} from '@/components/ui/item';
import AdminLayout from '@/layouts/admin/layout';
import AppLayout from '@/layouts/app-layout';
import { formatCurrency } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';
import type { Product } from '@/types';
import { Delete } from './delete';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Produk',
        href: ProductsController.index().url,
    },
];

export default function Index() {
    const { products } = usePage<{ products: Product[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk" />

            <AdminLayout>
                <div className="space-y-6">
                    <Heading variant="small" title="Produk" />

                    <ItemList
                        data={products}
                        columns={[
                            {
                                key: 'name',
                                label: 'Nama',
                                searchable: true,
                            },
                        ]}
                        renderItem={(product) => (
                            <Item key={product.id} size="xs" variant="outline">
                                <ItemHeader>
                                    <img
                                        src={`/${product.image}`}
                                        alt={product.image}
                                        width={128}
                                        height={128}
                                        className="aspect-square w-full rounded-sm object-cover"
                                    />
                                </ItemHeader>
                                <ItemContent className="gap-1">
                                    <ItemTitle>{product.name}</ItemTitle>
                                    <ItemDescription>
                                        {product.description}
                                    </ItemDescription>
                                    {formatCurrency(product.price)}
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
                                                ProductsController.edit(
                                                    product.id,
                                                ).url
                                            }
                                        >
                                            <Edit3 />
                                        </Link>
                                    </Button>
                                    <Delete product={product} />
                                </ItemActions>
                            </Item>
                        )}
                        perPage={10}
                        itemGroupClassName="md:grid-cols-2"
                        onAdd={
                            <Button size="sm" asChild>
                                <Link href={ProductsController.create().url}>
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
