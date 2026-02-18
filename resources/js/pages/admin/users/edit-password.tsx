import { Form, router } from '@inertiajs/react';
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
import { update } from '@/routes/admin/users';

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

export function EditPassword({ userData }: EditWalletProps) {
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    const [formData, setFormData] = useState({
        new_password: '',
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Ubah password user
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Perbarui password</DialogTitle>
                </DialogHeader>

                <Form {...update.form(userData.id)} disableWhileProcessing>
                    {({ processing, errors }) => (
                        <>
                            <FieldGroup className="gap-4">
                                <Field>
                                    <Label htmlFor="new_password">
                                        Password Baru
                                    </Label>
                                    <Input
                                        id="new_password"
                                        type="text"
                                        value={formData.new_password}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                new_password: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError
                                        message={errors.new_password}
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
                                            new_password: formData.new_password,
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
