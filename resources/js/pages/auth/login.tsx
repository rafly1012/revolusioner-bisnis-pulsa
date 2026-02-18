import { Form, Head } from '@inertiajs/react';
import { AlertTriangleIcon, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({ status, canRegister }: Props) {
    const [emailForAdmin, setEmailForAdmin] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Buat WhatsApp link berdasarkan input email user
    const message = encodeURIComponent(
        `Halo Admin, akun saya nonaktif.\n\n` +
            `Email: ${emailForAdmin || '[kosong]'}\n` +
            `Mohon diaktifkan kembali. Terima kasih.`,
    );

    const whatsappUrl = `https://api.whatsapp.com/send?phone=6281246074353&text=${message}`;

    return (
        <AuthLayout
            title="Masuk ke akun Anda"
            description="Masukkan email dan kata sandi Anda di bawah ini untuk masuk."
        >
            <Head title="Masuk" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        {errors.email && errors.email.includes('nonaktif') && (
                            <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                                <AlertTriangleIcon />
                                <AlertTitle>Akun non-aktif</AlertTitle>
                                <AlertDescription>
                                    {errors.email}
                                    <br />
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        Hubungi Admin via WhatsApp
                                    </a>
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    onChange={(e) =>
                                        setEmailForAdmin(e.target.value)
                                    }
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Kata sandi"
                                />
                                <InputError message={errors.password} />

                                <Button
                                    variant="outline"
                                    size="xs"
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <>
                                            Sembunyikan
                                            <EyeOff size={18} />
                                        </>
                                    ) : (
                                        <>
                                            Tampilkan
                                            <Eye size={18} />
                                        </>
                                    )}
                                </Button>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">Ingatkan saya</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Masuk
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-center text-sm text-muted-foreground">
                                Tidak punya akun?{' '}
                                <TextLink href={register()} tabIndex={5}>
                                    Mendaftar
                                </TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
