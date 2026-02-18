import { Head, Form, Link, usePage } from '@inertiajs/react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import WalletsController from '@/actions/App/Http/Controllers/Users/WalletsController';
import WithdrawalController from '@/actions/App/Http/Controllers/Users/WithdrawalController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemTitle,
} from '@/components/ui/item';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import UsersLayout from '@/layouts/users/layout';
import { formatCurrency } from '@/lib/utils';
import { store } from '@/routes/user/withdrawals';
import type { BreadcrumbItem, Wallet } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Penarikan',
        href: WithdrawalController.index().url,
    },
    {
        title: 'Buat',
        href: WithdrawalController.index().url,
    },
];

export default function Create() {
    const { wallet } = usePage<{ wallet: Wallet }>().props;

    const hasBankData = wallet.bank_name && wallet.bank_account;
    const MIN = 10000;
    const ADMIN_FEE_PERCENT = 10;
    const [amount, setAmount] = useState<number>(MIN);

    const netAmount = Math.max(0, amount - (amount * ADMIN_FEE_PERCENT) / 100);

    const isSaldoKurang = wallet.balance < MIN;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Penarikan" />

            <UsersLayout>
                <div className="space-y-6">
                    <Heading variant="small" title="Buat penarikan" />

                    {hasBankData ? (
                        <>
                            <ItemGroup className="grid grid-cols-2 gap-0.5">
                                <Item size="xs" variant="outline">
                                    <ItemContent>
                                        <ItemDescription>Bank</ItemDescription>
                                        <ItemTitle>
                                            {wallet.bank_name}
                                        </ItemTitle>
                                    </ItemContent>
                                </Item>

                                <Item size="xs" variant="outline">
                                    <ItemContent>
                                        <ItemDescription>
                                            Nomor Rekening
                                        </ItemDescription>
                                        <ItemTitle className="font-mono">
                                            {wallet.bank_account}
                                        </ItemTitle>
                                    </ItemContent>
                                </Item>
                            </ItemGroup>

                            {isSaldoKurang && (
                                <p className="text-sm text-destructive">
                                    Saldo tidak cukup.
                                </p>
                            )}

                            <Form {...store.form()} disableWhileProcessing>
                                {({ processing, errors }) => (
                                    <FieldGroup>
                                        <FieldSet>
                                            <FieldGroup>
                                                <Field>
                                                    <FieldLabel htmlFor="amount">
                                                        Jumlah
                                                        <span className="text-destructive">
                                                            *
                                                        </span>
                                                    </FieldLabel>

                                                    <div className="flex gap-2">
                                                        <Input
                                                            id="amount"
                                                            type="number"
                                                            name="amount"
                                                            value={amount}
                                                            disabled={
                                                                isSaldoKurang
                                                            }
                                                            min={MIN}
                                                            max={wallet.balance}
                                                            onChange={(e) =>
                                                                setAmount(
                                                                    Number(
                                                                        e.target
                                                                            .value,
                                                                    ),
                                                                )
                                                            }
                                                            required
                                                        />

                                                        <ButtonGroup>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="icon"
                                                                disabled={
                                                                    isSaldoKurang
                                                                }
                                                                onClick={() =>
                                                                    setAmount(
                                                                        MIN,
                                                                    )
                                                                }
                                                            >
                                                                <MinusIcon />
                                                            </Button>

                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="icon"
                                                                disabled={
                                                                    isSaldoKurang
                                                                }
                                                                onClick={() =>
                                                                    setAmount(
                                                                        wallet.balance,
                                                                    )
                                                                }
                                                            >
                                                                <PlusIcon />
                                                            </Button>
                                                        </ButtonGroup>
                                                    </div>

                                                    <p className="text-lg">
                                                        Minimal Rp 10.000 —
                                                        Maksimal{' '}
                                                        {formatCurrency(
                                                            wallet.balance,
                                                        )}
                                                    </p>

                                                    <p className="text-lg">
                                                        Biaya Admin 10%
                                                    </p>

                                                    <p className="text-lg">
                                                        Setelah potongan 10%:{' '}
                                                        {formatCurrency(
                                                            netAmount,
                                                        )}
                                                    </p>

                                                    <InputError
                                                        message={errors.amount}
                                                        className="mt-2"
                                                    />
                                                </Field>
                                            </FieldGroup>

                                            {!isSaldoKurang && (
                                                <Field orientation="horizontal">
                                                    <Button
                                                        type="submit"
                                                        size="sm"
                                                    >
                                                        {processing && (
                                                            <Spinner />
                                                        )}
                                                        Simpan
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={
                                                                WithdrawalController.index()
                                                                    .url
                                                            }
                                                        >
                                                            Kembali
                                                        </Link>
                                                    </Button>
                                                </Field>
                                            )}
                                        </FieldSet>
                                    </FieldGroup>
                                )}
                            </Form>
                        </>
                    ) : (
                        <Form
                            method="post"
                            action={WalletsController.store().url}
                        >
                            {({ processing, errors }) => (
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="bank_name">
                                            Nama Bank
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </FieldLabel>
                                        <Input
                                            id="bank_name"
                                            type="text"
                                            name="bank_name"
                                            required
                                        />
                                        <InputError
                                            message={errors.bank_name}
                                            className="mt-2"
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="bank_account">
                                            Nomor Rekening
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </FieldLabel>
                                        <Input
                                            id="bank_account"
                                            type="text"
                                            name="bank_account"
                                            required
                                        />
                                        <InputError
                                            message={errors.bank_account}
                                            className="mt-2"
                                        />
                                    </Field>

                                    <Button type="submit" size="sm">
                                        {processing && <Spinner />}
                                        Simpan Rekening
                                    </Button>
                                </FieldGroup>
                            )}
                        </Form>
                    )}
                </div>
            </UsersLayout>
        </AppLayout>
    );
}
