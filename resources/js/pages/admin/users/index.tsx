import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import UsersController from '@/actions/App/Http/Controllers/Admin/UsersController';
import { ConfirmPasswordDialog } from '@/components/confirm-password-dialog';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { ItemList } from '@/components/item-list';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from '@/components/ui/item';
import { Spinner } from '@/components/ui/spinner';
import AdminLayout from '@/layouts/admin/layout';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { User } from '@/types';
import { reward } from '@/routes/admin/users';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengguna',
        href: UsersController.index().url,
    },
];

export default function Home() {
    const { users } = usePage<{ users: User[] }>().props;
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengguna" />

            <AdminLayout>
                <div className="space-y-6">
                    <Heading variant="small" title="Pengguna" />

                    <ItemList
                        data={users}
                        columns={[
                            {
                                key: 'name',
                                label: 'Nama',
                                searchable: true,
                            },
                            {
                                key: 'email',
                                label: 'Email',
                                searchable: true,
                            },
                            {
                                key: 'referral_code',
                                label: 'Kode Referral',
                                searchable: true,
                            },
                        ]}
                        renderItem={(user) => (
                            <Item key={user.id} size="xs" variant="outline">
                                <ItemMedia>
                                    <Avatar>
                                        <AvatarImage
                                            src={user.avatar}
                                            className="grayscale"
                                        />
                                        <AvatarFallback>
                                            {user.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </ItemMedia>
                                <ItemContent className="gap-1">
                                    {/* Status badge */}
                                    {user.is_active ? (
                                        <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                                            Aktif
                                        </Badge>
                                    ) : (
                                        <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                                            Nonaktif
                                        </Badge>
                                    )}
                                    <ItemTitle>{user.name}</ItemTitle>
                                    <ItemDescription>
                                        {user.email}
                                    </ItemDescription>
                                    <ItemTitle className="font-mono">
                                        {user.referral_code}
                                    </ItemTitle>
                                </ItemContent>

                                <ItemActions>
                                    <Button
                                        variant={
                                            user.is_active
                                                ? 'destructive'
                                                : 'outline'
                                        }
                                        size="sm"
                                        onClick={() => {
                                            setSelectedUserId(user.id);
                                            setOpenConfirm(true);
                                        }}
                                    >
                                        {user.is_active
                                            ? 'Nonaktifkan'
                                            : 'Aktifkan'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon-sm"
                                        asChild
                                    >
                                        <Link
                                            href={
                                                UsersController.show(user.id)
                                                    .url
                                            }
                                        >
                                            <ArrowUpRight />
                                        </Link>
                                    </Button>
                                </ItemActions>
                            </Item>
                        )}
                        perPage={10}
                        onAdd={(() => {
                            const [open, setOpen] = useState(false);
                            const [openConfirm, setOpenConfirm] =
                                useState(false);
                            const form = useForm<{ amount: string }>({
                                amount: '',
                            });

                            return (
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="sm">Hadiah</Button>
                                    </DialogTrigger>

                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Bagi hadiah
                                            </DialogTitle>
                                        </DialogHeader>

                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                setOpenConfirm(true);
                                            }}
                                            className="space-y-4"
                                        >
                                            <Field>
                                                <FieldLabel htmlFor="amount">
                                                    Nominal
                                                </FieldLabel>
                                                <Input
                                                    id="amount"
                                                    value={form.data.amount}
                                                    onChange={(e) =>
                                                        form.setData(
                                                            'amount',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                <InputError
                                                    message={form.errors.amount}
                                                    className="mt-2"
                                                />
                                            </Field>

                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline">
                                                        Batal
                                                    </Button>
                                                </DialogClose>

                                                <Button
                                                    type="submit"
                                                    disabled={form.processing}
                                                >
                                                    {form.processing && (
                                                        <Spinner />
                                                    )}
                                                    Bagikan
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>

                                    <ConfirmPasswordDialog
                                        open={openConfirm}
                                        onOpenChange={setOpenConfirm}
                                        triggerHidden
                                        onConfirm={(password) => {
                                            router.post(
                                                reward().url,
                                                {
                                                    amount: form.data.amount,
                                                    action_password: password,
                                                },
                                                {
                                                    onSuccess: () => {
                                                        setOpenConfirm(false);
                                                        setOpen(false); // 👈 langsung tutup dialog
                                                        form.reset();
                                                    },
                                                },
                                            );
                                        }}
                                    />
                                </Dialog>
                            );
                        })()}
                    />

                    <ConfirmPasswordDialog
                        open={openConfirm}
                        onOpenChange={setOpenConfirm}
                        triggerHidden
                        onConfirm={(password) => {
                            if (!selectedUserId) return;

                            const user = users.find(
                                (u) => u.id === selectedUserId,
                            );

                            if (!user) return;

                            router.post(
                                UsersController.isActive(selectedUserId).url,
                                {
                                    _method: 'patch',
                                    action_password: password,
                                    is_activate: user.is_active ? 0 : 1,
                                },
                                {
                                    onSuccess: () => {
                                        setOpenConfirm(false);
                                        setSelectedUserId(null);
                                    },
                                },
                            );
                        }}
                    />
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
