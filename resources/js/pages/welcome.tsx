import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Users, Wallet, Shield } from 'lucide-react';
import { InfoIcon } from 'lucide-react';
import ProductsController from '@/actions/App/Http/Controllers/Users/ProductsController';
import AppLogoIcon from '@/components/app-logo-icon';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { kebijakanprivasi, login, register, syaratketentuan } from '@/routes';
import { dashboard } from '@/routes/admin';
import type { SharedData } from '@/types';

type Product = {
    id: number;
    name: string;
    price: number;
    image?: string | null;
    description?: string | null;
};

type Announcement = {
    id: number;
    title: string;
    content?: string | null;
};

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth, products, announcements } = usePage<
        SharedData & { products?: Product[]; announcements?: Announcement[] }
    >().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-linear-to-b from-background to-muted/20 p-6 lg:p-8">
                <header className="mb-6 w-full max-w-7xl">
                    <nav className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <AppLogoIcon className="h-24 w-24 rounded-xl" />
                            <span className="text-xl font-semibold">
                                Revolusioner Bisnis Pulsa
                            </span>
                        </Link>
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Button asChild>
                                    <Link
                                        href={
                                            auth.user.role === 'users'
                                                ? ProductsController.index()
                                                : dashboard()
                                        }
                                    >
                                        {auth.user.role === 'users'
                                            ? 'Produk'
                                            : 'Dashboard'}
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button variant="ghost" asChild>
                                        <Link href={login()}>Log in</Link>
                                    </Button>
                                    {canRegister && (
                                        <Button asChild>
                                            <Link href={register()}>
                                                Register
                                                <ArrowRight />
                                            </Link>
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="flex w-full max-w-7xl flex-col gap-20">
                    {/* HERO SECTION */}
                    <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-20">
                        {/* Left Content */}
                        <div className="flex flex-col justify-center space-y-8">
                            <div className="space-y-4">
                                {announcements && announcements.length > 0 && (
                                    <Alert className="animate-pulse border-cyan-200 bg-cyan-50 text-cyan-900 dark:border-cyan-900 dark:bg-cyan-950 dark:text-cyan-50">
                                        <InfoIcon />
                                        <AlertTitle>
                                            {announcements[0].title}
                                        </AlertTitle>
                                        <AlertDescription>
                                            {announcements[0].content}
                                        </AlertDescription>
                                    </Alert>
                                )}

                                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                    Bangun Jaringan,
                                    <span className="block bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                        Raih Penghasilan
                                    </span>
                                </h1>

                                <p className="text-lg text-muted-foreground">
                                    Bergabunglah dengan platform bisnis MLM
                                    terpercaya. Dapatkan komisi dari setiap
                                    referral hingga 10 level, bonus reward
                                    bulanan, dan sistem penarikan yang mudah.{' '}
                                    <Link
                                        href={syaratketentuan().url}
                                        className="underline"
                                    >
                                        Syarat & Ketentuan
                                    </Link>{' '}
                                    berlaku. Baca{' '}
                                    <Link
                                        href={kebijakanprivasi().url}
                                        className="underline"
                                    >
                                        kebijakan privasi
                                    </Link>{' '}
                                    kami!
                                </p>

                                <img
                                    src="/public/img/logo.jpeg"
                                    alt="logo"
                                    className="hidden w-full rounded-lg object-cover lg:block"
                                />
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                {!auth.user && canRegister && (
                                    <Button size="lg" asChild>
                                        <Link href={register()}>
                                            Mulai Sekarang
                                            <ArrowRight />
                                        </Link>
                                    </Button>
                                )}
                                {!auth.user && (
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href={login()}>
                                            Sudah Punya Akun
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Right Content - Feature Cards */}
                        <div className="grid gap-4">
                            <img
                                src="/public/img/bg.jpeg"
                                alt="logo"
                                className="w-full rounded-lg object-cover"
                            />
                            <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                                    <Users className="size-6 text-primary" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">
                                    Sistem Referral 10 Level
                                </h3>
                                <p className="text-muted-foreground">
                                    Dapatkan komisi dari jaringan Anda hingga 10
                                    level ke bawah.
                                </p>
                            </div>

                            <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                                    <Wallet className="size-6 text-primary" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">
                                    Bonus Reward Bulanan
                                </h3>
                                <p className="text-muted-foreground">
                                    Pembagian dana admin setiap bulan
                                    berdasarkan aktivitas transaksi.
                                </p>
                            </div>

                            <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                                    <Shield className="size-6 text-primary" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">
                                    Penarikan Mudah & Aman
                                </h3>
                                <p className="text-muted-foreground">
                                    Tarik komisi kapan saja langsung ke rekening
                                    bank.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PRODUCTS SECTION */}
                    <div>
                        <h2 className="mb-8 text-center text-3xl font-bold">
                            Produk Kami
                        </h2>

                        <div className="grid gap-6 sm:grid-cols-2">
                            {products?.map((product) => (
                                <div
                                    key={product.id}
                                    className="rounded-xl border bg-card p-4 shadow-sm transition hover:shadow-md"
                                >
                                    {product.image && (
                                        <img
                                            src={`/${product.image}`}
                                            alt={product.name}
                                            className="mb-3 aspect-square w-full rounded-lg object-cover"
                                        />
                                    )}

                                    <h3 className="text-lg font-semibold">
                                        {product.name}
                                    </h3>

                                    <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
                                        {product.description}
                                    </p>

                                    <div className="mt-4 font-bold text-primary">
                                        Rp{' '}
                                        {product.price.toLocaleString('id-ID')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                <footer className="mt-12 w-full max-w-7xl border-t pt-6 text-center text-sm text-muted-foreground">
                    <p>
                        &copy; {new Date().getFullYear()} Revolusioner Bisnis
                        Pulsa.{' '}
                        <Link
                            href={syaratketentuan().url}
                            className="underline"
                        >
                            Syarat & Ketentuan
                        </Link>
                        .{' '}
                        <Link
                            href={kebijakanprivasi().url}
                            className="underline"
                        >
                            kebijakan privasi
                        </Link>
                    </p>
                </footer>
            </div>
        </>
    );
}
