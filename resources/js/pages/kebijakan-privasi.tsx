import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { kebijakanprivasi, syaratketentuan } from '@/routes';

export default function KebijakanPrivasi() {
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
                    Kebijakan Privasi
                </h1>

                <p className="leading-7 not-first:mt-2">
                    RBP (Revolusioner Bisnis Pulsa), dapat diakses dari{' '}
                    <Link href="/" className="text-primary underline">
                        https://revolusionerbisnispulsa.vercel.app
                    </Link>
                    . Salah satu prioritas utama kami adalah privasi pengunjung.
                    Dokumen Kebijakan Privasi ini berisi jenis informasi yang
                    dikumpulkan dan dicatat oleh RBP (Revolusioner Bisnis
                    Pulsa), dan cara kami menggunakannya.
                </p>

                <p className="leading-7 not-first:mt-2">
                    Jika Anda memiliki pertanyaan tambahan atau memerlukan
                    informasi lebih lanjut tentang Kebijakan Privasi kami,
                    jangan ragu untuk menghubungi kami melalui email:
                    revolusionerbisnispulsa@gmail.com Kebijakan Privasi ini
                    hanya berlaku untuk aktivitas online kami dan berlaku bagi
                    pengunjung situs web kami sehubungan dengan informasi yang
                    mereka bagikan dan/atau kumpulkan di RBP (Revolusioner
                    Bisnis Pulsa). Kebijakan ini tidak berlaku untuk informasi
                    apa pun yang dikumpulkan secara offline atau melalui saluran
                    selain situs web ini.
                </p>

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Izin
                </h3>

                <p className="leading-7 not-first:mt-2">
                    Dengan menggunakan situs web kami, anda dengan ini
                    menyetujui Kebijakan Privasi kami dan menyetujui syarat &
                    ketentuannya.
                </p>

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Informasi yang Kami Kumpulkan
                </h3>

                <p className="leading-7 not-first:mt-2">
                    Informasi pribadi yang diminta untuk anda berikan, dan
                    alasan mengapa anda diminta untuk memberikannya, akan
                    dijelaskan kepada anda pada saat kami meminta anda untuk
                    memberikan informasi pribadi anda.
                </p>

                <p className="leading-7 not-first:mt-2">
                    Jika anda menghubungi kami secara langsung, kami mungkin
                    menerima informasi tambahan tentang anda seperti nama,
                    alamat email, nomor telepon, isi pesan dan/atau lampiran
                    yang anda kirimkan kepada kami, dan informasi lain yang
                    mungkin anda pilih untuk diberikan.
                </p>

                <p className="leading-7 not-first:mt-2">
                    Saat anda mendaftar untuk suatu akun, kami mungkin meminta
                    informasi kontak anda, termasuk hal-hal seperti nama, nama
                    perusahaan, alamat, alamat email, dan nomor telepon.
                </p>

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Bagaimana Kami Menggunakan Informasi Anda?
                </h3>

                <p className="leading-7 not-first:mt-2">
                    Kami menggunakan informasi yang kami kumpulkan dengan
                    berbagai cara, termasuk untuk:
                </p>

                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>
                        Menyediakan, mengoperasikan, dan memelihara situs web
                        kami.
                    </li>
                    <li>
                        Tingkatkan, personalisasikan, dan perluas situs web
                        kami.
                    </li>
                    <li>
                        Pahami dan analisis bagaimana anda menggunakan situs web
                        kami.
                    </li>
                    <li>
                        Mengembangkan produk, layanan, fitur, dan fungsionalitas
                        baru.
                    </li>
                </ul>

                <p className="leading-7 not-first:mt-2">
                    Berkomunikasi dengan anda, baik secara langsung atau melalui
                    salah satu mitra kami, termasuk untuk layanan pelanggan,
                    untuk memberi anda pembaruan dan informasi lain yang
                    berkaitan dengan situs web, dan untuk tujuan pemasaran dan
                    promosi, Mengirimi anda email, Temukan dan cegah penipuan
                </p>

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    File Log
                </h3>

                <p className="leading-7 not-first:mt-2">
                    RBP (Revolusioner Bisnis Pulsa), mengikuti prosedur standar
                    menggunakan file log. File-file ini mencatat pengunjung
                    ketika mereka mengunjungi situs web. Semua perusahaan
                    hosting melakukan ini dan merupakan bagian dari analisis
                    layanan hosting. Informasi yang dikumpulkan oleh file log
                    termasuk alamat protokol internet (IP), jenis browser,
                    Penyedia Layanan Internet (ISP), cap tanggal dan waktu,
                    halaman rujukan/keluar, dan mungkin jumlah klik. Ini tidak
                    terkait dengan informasi apa pun yang dapat diidentifikasi
                    secara pribadi. Tujuan dari informasi tersebut adalah untuk
                    menganalisis tren, mengelola situs, melacak pergerakan
                    pengguna di situs web, dan mengumpulkan informasi
                    demografis.
                </p>

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Cookie dan Web Beacon
                </h3>

                <p className="leading-7 not-first:mt-2">
                    Seperti situs web lainnya, RBP (Revolusioner Bisnis Pulsa),
                    menggunakan 'cookies'. Cookies ini digunakan untuk menyimpan
                    informasi termasuk preferensi pengunjung, dan
                    halaman-halaman di situs web yang diakses atau dikunjungi
                    pengunjung. Informasi tersebut digunakan untuk
                    mengoptimalkan pengalaman pengguna dengan menyesuaikan
                    konten halaman web kami berdasarkan jenis browser pengunjung
                    dan/atau informasi lainnya.
                </p>

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Kebijakan Privasi Mitra Periklanan
                </h3>

                <p className="leading-7 not-first:mt-2">
                    Anda dapat berkonsultasi dengan daftar ini untuk menemukan
                    Kebijakan Privasi masing-masing mitra periklanan RBP
                    (Revolusioner Bisnis Pulsa). Server iklan atau jaringan
                    iklan pihak ketiga menggunakan teknologi seperti cookie,
                    JavaScript, atau Web Beacon yang digunakan dalam iklan
                    masing-masing dan tautan yang muncul di RBP (Revolusioner
                    Bisnis Pulsa), yang dikirim langsung ke browser pengguna.
                    Mereka secara otomatis menerima alamat IP anda ketika ini
                    terjadi. Teknologi ini digunakan untuk mengukur efektivitas
                    kampanye iklan mereka dan/atau untuk mempersonalisasi konten
                    iklan yang anda lihat di situs web yang anda kunjungi.
                </p>

                <p className="leading-7 not-first:mt-2">
                    Perhatikan bahwa RBP (Revolusioner Bisnis Pulsa), tidak
                    memiliki akses atau kontrol terhadap cookie yang digunakan
                    oleh pengiklan pihak ketiga.
                </p>

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Kebijakan Privasi Pihak Ketiga
                </h3>

                <p className="leading-7 not-first:mt-2">
                    Kebijakan Privasi RBP (Revolusioner Bisnis Pulsa), tidak
                    berlaku untuk pengiklan atau situs web lain. Oleh karena
                    itu, kami menyarankan anda untuk berkonsultasi dengan
                    Kebijakan Privasi masing-masing server iklan pihak ketiga
                    ini untuk informasi lebih rinci. Ini mungkin mencakup
                    praktik dan instruksi mereka tentang cara memilih untuk
                    tidak ikut serta dalam opsi tertentu.
                </p>

                <p className="leading-7 not-first:mt-2">
                    Anda dapat memilih untuk menonaktifkan cookie melalui opsi
                    browser individual anda. Untuk mengetahui informasi lebih
                    detail mengenai pengelolaan cookie dengan browser web
                    tertentu, dapat ditemukan di situs web browser
                    masing-masing.
                </p>

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Hak Privasi CCPA (Jangan Jual Informasi Pribadi Saya)
                </h3>

                <p className="leading-7 not-first:mt-2">
                    Berdasarkan CCPA, di antara hak-hak lainnya, konsumen
                    California mempunyai hak untuk:
                </p>

                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>
                        Meminta agar bisnis yang mengumpulkan data pribadi
                        konsumen mengungkapkan kategori dan data pribadi
                        tertentu yang dikumpulkan bisnis tentang konsumen.
                    </li>
                    <li>
                        Meminta suatu bisnis untuk menghapus data pribadi apa
                        pun tentang konsumen yang telah dikumpulkan oleh suatu
                        bisnis.
                    </li>
                    <li>
                        Meminta agar bisnis yang menjual data pribadi konsumen,
                        bukan menjual data pribadi konsumen.
                    </li>
                </ul>

                <p className="leading-7 not-first:mt-2">
                    Jika anda mengajukan permintaan, kami memiliki waktu satu
                    bulan untuk menanggapi anda. Jika anda ingin menggunakan
                    hak-hak ini, silakan hubungi kami.
                </p>

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Hak Perlindungan Data GDPR
                </h3>

                <p className="leading-7 not-first:mt-2">
                    Kami ingin memastikan anda sepenuhnya menyadari semua hak
                    perlindungan data anda. Setiap pengguna berhak mendapatkan
                    hal berikut:
                </p>

                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>
                        Hak untuk mengakses – Anda berhak meminta salinan data
                        pribadi anda. Kami mungkin membebankan sedikit biaya
                        kepada anda untuk layanan ini.
                    </li>
                    <li>
                        Hak atas perbaikan – Anda berhak meminta kami mengoreksi
                        informasi apa pun yang anda yakini tidak akurat. Anda
                        juga berhak meminta kami melengkapi informasi yang anda
                        yakini tidak lengkap.
                    </li>
                    <li>
                        Hak untuk menghapus – Anda berhak meminta kami menghapus
                        data pribadi anda, dalam kondisi tertentu.
                    </li>

                    <li>
                        Hak untuk membatasi pemrosesan – Anda berhak meminta
                        kami membatasi pemrosesan data pribadi anda, dalam
                        kondisi tertentu.
                    </li>
                    <li>
                        Hak untuk menolak pemrosesan – Anda berhak menolak
                        pemrosesan data pribadi anda oleh kami, dalam kondisi
                        tertentu.
                    </li>

                    <li>
                        Hak atas portabilitas data – Anda berhak meminta agar
                        kami mentransfer data yang telah kami kumpulkan ke
                        organisasi lain, atau langsung kepada anda, dalam
                        kondisi tertentu.
                    </li>
                </ul>

                <p className="leading-7 not-first:mt-2">
                    Jika anda mengajukan permintaan, kami memiliki waktu satu
                    bulan untuk menanggapi anda. Jika anda ingin menggunakan
                    hak-hak ini, silakan hubungi kami.
                </p>

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Informasi Anak
                </h3>

                <p className="leading-7 not-first:mt-2">
                    Bagian lain dari prioritas kami adalah menambahkan
                    perlindungan bagi anak-anak saat menggunakan internet. Kami
                    mendorong orang tua dan wali untuk mengamati,
                    berpartisipasi, dan/atau memantau dan membimbing aktivitas
                    online mereka.
                </p>

                <p className="leading-7 not-first:mt-2">
                    RBP (Revolusioner Bisnis Pulsa), tidak dengan sengaja
                    mengumpulkan Informasi Identifikasi pribadi apa pun dari
                    anak-anak di bawah usia 13 tahun. Jika menurut anda anak
                    anda memberikan informasi semacam ini di situs web kami,
                    kami sangat menganjurkan anda untuk segera menghubungi kami
                    dan kami akan melakukan upaya terbaik untuk segera
                    menghapusnya. informasi tersebut dari catatan kami.
                </p>

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
