import { router } from '@inertiajs/react';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import ProductsController from '@/actions/App/Http/Controllers/Admin/ProductsController';
import { ConfirmPasswordDialog } from '@/components/confirm-password-dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name?: string;
}

interface DeleteProps {
    product: Product;
}

export function Delete({ product }: DeleteProps) {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="destructive"
                        size="icon-sm"
                        className="rounded-full"
                    >
                        <Trash2Icon />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                            <Trash2Icon />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Hapus produk?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Produk
                            {product.name ? (
                                <b className="text-primary"> {product.name} </b>
                            ) : (
                                ''
                            )}{' '}
                            akan dihapus secara permanen dan tidak bisa
                            dikembalikan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel variant="outline">
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction variant="destructive" asChild>
                            <Button
                                onClick={() => setOpenConfirm(true)}
                                type="button"
                            >
                                Hapus
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Confirm Password */}
            <ConfirmPasswordDialog
                open={openConfirm}
                onOpenChange={setOpenConfirm}
                triggerHidden
                onConfirm={(password) => {
                    router.delete(ProductsController.destroy(product.id).url, {
                        data: { action_password: password },
                        onSuccess: () => {
                            setOpenConfirm(false);
                            setOpenDialog(false); // tutup dialog utama
                        },
                    });
                }}
            />
        </>
    );
}
