import { Head, Link, usePage } from '@inertiajs/react';
import ProductsController from '@/actions/App/Http/Controllers/Users/ProductsController';
import Heading from '@/components/heading';
import { ItemList } from '@/components/item-list';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemHeader,
    ItemTitle,
} from '@/components/ui/item';
import AppLayout from '@/layouts/app-layout';
import UsersLayout from '@/layouts/users/layout';
import { formatCurrency } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';
import type { Product } from '@/types';

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

            <UsersLayout>
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
                                        src={`/public/${product.image}`}
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
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button size="sm">Beli</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="text-center text-2xl">
                                                    Klik gambar untuk
                                                    melanjutkan pembelian dan
                                                    signal
                                                </AlertDialogTitle>
                                            </AlertDialogHeader>
                                            <Link
                                                href={
                                                    ProductsController.buy(
                                                        product.id,
                                                    ).url
                                                }
                                                method="post"
                                                className="group relative block cursor-pointer"
                                            >
                                                <video
                                                    src="/public/img/buy.mp4"
                                                    className="w-full"
                                                    autoPlay
                                                    muted
                                                    loop
                                                    poster="/public/img/buy.jpeg"
                                                >
                                                    <source
                                                        src="/public/img/buy.mp4"
                                                        type="video/mp4"
                                                    />
                                                    Video tidak didukung oleh
                                                    browser Anda.
                                                </video>

                                                {/* Overlay text */}
                                                <span className="absolute inset-0 flex items-center justify-center bg-background/70 text-4xl font-bold text-primary opacity-0 transition group-hover:opacity-100">
                                                    Beli {product.name}
                                                </span>
                                            </Link>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </ItemActions>
                            </Item>
                        )}
                        perPage={10}
                        itemGroupClassName="md:grid-cols-2"
                    />
                </div>
            </UsersLayout>
        </AppLayout>
    );
}
