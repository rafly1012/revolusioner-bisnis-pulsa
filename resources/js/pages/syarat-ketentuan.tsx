import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { kebijakanprivasi, syaratketentuan } from '@/routes';

export default function SyaratKetentuan() {
    return (
        <div className="flex min-h-screen flex-col items-center bg-linear-to-b from-background to-muted/20 p-6 lg:p-8">
            <header className="mb-6 w-full max-w-7xl">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <AppLogoIcon className="h-24 w-24 rounded-xl" />
                        <span className="text-xl font-semibold">
                            Revolusioner Bisnis Pulsa
                        </span>
                    </Link>
                </nav>
            </header>

            <main className="w-full max-w-4xl space-y-2 text-sm leading-relaxed text-muted-foreground">
                <h1 className="text-2xl font-bold text-foreground">
                    Syarat & Ketentuan
                </h1>

                <p className="leading-7 not-first:mt-2">
                    Situs ini dioperasikan oleh RBP (Revolusioner Bisnis Pulsa)
                    yang bukan merupakan broker-dealer, investasi, penasihat
                    investasi terdaftar. RBP (Revolusioner Bisnis Pulsa) tidak
                    memberikan nasihat investasi, dukungan atau rekomendasi
                    sehubungan dengan penjualan apa pun yang terdaftar di situs
                    ini.
                </p>

                <p className="leading-7 not-first:mt-2">
                    Tidak ada apa pun di situs web ini yang boleh ditafsirkan
                    sebagai tawaran untuk menjual, investasi , atau rekomendasi
                    sehubungan dengan suatu sekuritas. Anda sepenuhnya
                    bertanggung jawab untuk menentukan apakah anda ingin menjual
                    atau membeli, strategi investasi, atau transaksi terkait apa
                    pun sesuai untuk anda berdasarkan tujuan kebutuhan anda,
                    investasi pribadi anda, keadaan keuangan, dan toleransi
                    risiko. Anda harus berkonsultasi dengan profesional hukum
                    berlisensi dan penasihat investasi untuk mendapatkan nasihat
                    hukum, pajak, asuransi, atau investasi.
                </p>

                <p className="leading-7 not-first:mt-2">
                    RBP (Revolusioner Bisnis Pulsa) tidak menjamin kinerja anda,
                    hasil, atau pengembalian modal apa pun atas yang diposting
                    di situs ini. Dengan mengakses situs ini dan halaman mana
                    pun di dalamnya, anda setuju untuk terikat oleh Syarat &
                    Ketentuan dan Kebijakan Privasi.
                </p>

                <p className="leading-7 not-first:mt-2">
                    Dengan mengakses situs ini, anda memahami dan mengetahui:
                </p>

                <ul className="my-6 ml-6 list-decimal [&>li]:mt-2">
                    <li>
                        Bahwa anda sebagai pelanggan/ mitra RBP (Revolusioner
                        Bisnis Pulsa).
                    </li>
                    <li>Bahwa situs ini bukan sebuah investasi.</li>
                    <li>
                        Bahwa yang anda lakukan mungkin tidak menghasilkan arus
                        kas positif atau kinerja seperti yang anda harapkan, dan
                    </li>
                    <li>
                        Bahwa harga kamar yang dipasarkan di masa depan tidak
                        dapat diprediksi sehingga sewaktu-waktu dapat berubah.
                    </li>
                </ul>

                <p className="leading-7 not-first:mt-2">
                    Sebelum mengambil keputusan sebagai pelanggan tetap/mitra
                    RBP (Revolusioner Bisnis Pulsa) disarankan untuk meninjau
                    semua informasi yang tersedia dan berkonsultasi dengan
                    penasihat pajak dan hukumnya.
                </p>

                <p className="leading-7 not-first:mt-2">
                    RBP (Revolusioner Bisnis Pulsa) tidak memberikan saran atau
                    rekomendasi mengenai penawaran apa pun yang diposting di
                    situs web ini.
                </p>

                <p className="leading-7 not-first:mt-2">
                    Setiap informasi terkait yang terkandung di sini diperoleh
                    dari sumber yang diyakini dapat diandalkan oleh RBP
                    (Revolusioner Bisnis Pulsa), namun kami tidak membuat
                    pernyataan atau jaminan mengenai keakuratan atau kelengkapan
                    informasi tersebut dan oleh karena itu kami tidak
                    bertanggung jawab.
                </p>

                <p className="leading-7 not-first:mt-2">
                    Hyperlink ke situs pihak ketiga, atau reproduksi artikel
                    pihak ketiga, bukan merupakan persetujuan atau dukungan RBP
                    (Revolusioner Bisnis Pulsa) atas konten yang ditautkan atau
                    direproduksi.
                </p>

                <p className="leading-7 not-first:mt-2">
                    RBP (Revolusioner Bisnis Pulsa) menawarkan kepada pelangan
                    tetap/ mitranya di pasar dan layanan transfer untuk
                    menggunakan dompet seperti, Gopay, Ovo, Dana dan seluruh
                    Bank di Indonesia.
                </p>

                <h2 className="text-lg font-semibold text-foreground">
                    TAMBAHAN
                </h2>

                <ul className="my-6 ml-6 list-decimal [&>li]:mt-2">
                    <li>
                        Setiap mitra wajib mengaktifkan keanggotaannya setiap
                        tahun dengan biaya administrasi sebesar Rp 50.000 ( Lima
                        Ribu Rupiah)..
                    </li>
                    <li>
                        Setiap mitra wajib menjaga nama baik dan reputasi RBP (
                        Revolusioner Bisnis Hotel).
                    </li>
                    <li>
                        Setiap mitra wajib tunduk dan taat pada syarat,
                        ketentuan dan kebijakan RBP ( Revolusioner Bisnis
                        Pulsa).
                    </li>
                    <li>
                        Mitra yang tidak tunduk dan taat pada syarat, ketentuan
                        dan kebijakan RBP ( Revolusioner Bisnis Pulsa) dapat di
                        kenakan sanksi yakni dinonaktifkan akun dan dapat
                        dikeluarkan.
                    </li>
                </ul>

                <p className="text-lg font-semibold text-foreground">
                    Terima kasih telah mempercayai layanan Revolusioner Bisnis
                    Pulsa.
                </p>
            </main>

            <footer className="mt-12 w-full max-w-7xl border-t pt-6 text-center text-sm text-muted-foreground">
                <p className="leading-7 not-first:mt-2">
                    &copy; {new Date().getFullYear()} Revolusioner Bisnis Pulsa.{' '}
                    <Link href={syaratketentuan().url} className="underline">
                        Syarat & Ketentuan
                    </Link>
                    .{' '}
                    <Link href={kebijakanprivasi().url} className="underline">
                        kebijakan privasi
                    </Link>
                </p>
            </footer>
        </div>
    );
}
