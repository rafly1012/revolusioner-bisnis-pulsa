import { Form, router } from '@inertiajs/react';
import { Edit2 } from 'lucide-react';
import { useState } from 'react';
import { ConfirmPasswordDialog } from '@/components/confirm-password-dialog';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { update } from '@/routes/admin/wallets/user';

type User = {
    id: number;
    wallet?: {
        id: number;
        bank_name: number;
        bank_account: number;
    };
};

interface EditWalletProps {
    userData: User;
}

export function EditWallet({ userData }: EditWalletProps) {
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    const [formData, setFormData] = useState({
        bank_name: userData.wallet?.bank_name ?? '',
        bank_account: userData.wallet?.bank_account ?? '',
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon-sm">
                    <Edit2 />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Perbarui dompet</DialogTitle>
                </DialogHeader>

                <Form {...update.form(userData.id)} disableWhileProcessing>
                    {({ processing, errors }) => (
                        <>
                            <FieldGroup className="gap-4">
                                <Field>
                                    <Label htmlFor="bank_name">Nama Bank</Label>
                                    <Input
                                        id="bank_name"
                                        value={formData.bank_name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                bank_name: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError
                                        message={errors.bank_name}
                                        className="mt-2"
                                    />
                                </Field>

                                <Field>
                                    <Label htmlFor="bank_account">
                                        Nomor Rekening
                                    </Label>
                                    <Input
                                        id="bank_account"
                                        value={formData.bank_account}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                bank_account: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError
                                        message={errors.bank_account}
                                        className="mt-2"
                                    />
                                </Field>
                            </FieldGroup>

                            <DialogFooter className="mt-2">
                                <DialogClose asChild>
                                    <Button variant="outline">Batal</Button>
                                </DialogClose>

                                <Button
                                    type="button"
                                    disabled={processing}
                                    onClick={() => setOpenConfirm(true)}
                                >
                                    Simpan
                                </Button>
                            </DialogFooter>

                            <ConfirmPasswordDialog
                                open={openConfirm}
                                onOpenChange={setOpenConfirm}
                                triggerHidden
                                onConfirm={(password) => {
                                    router.patch(
                                        update(userData.id).url,
                                        {
                                            bank_name: formData.bank_name,
                                            bank_account: formData.bank_account,
                                            action_password: password,
                                        },
                                        {
                                            onSuccess: () => {
                                                setOpenConfirm(false);
                                                setOpen(false); // 🔥 tutup dialog utama
                                            },
                                        },
                                    );
                                }}
                            />
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
