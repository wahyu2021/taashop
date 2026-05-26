import PublicLayout from '@/Layouts/PublicLayout';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Privacy() {
    const { site_settings } = usePage<PageProps>().props;

    return (
        <PublicLayout>
            <Head title="Kebijakan Privasi - Taaashop" />

            <section className="bg-stone-950 py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }} />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block bg-orange-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 mb-4">
                            Legal
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
                            Kebijakan <span className="text-orange-600">Privasi</span>
                        </h1>
                        <p className="text-stone-400 text-lg">
                            Bagaimana kami melindungi, mengelola, dan menggunakan data pribadi Anda demi keamanan dan kenyamanan bertransaksi di Taaashop.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto prose prose-stone prose-lg lg:prose-xl prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-a:text-orange-600 hover:prose-a:text-orange-700">
                        <p className="lead">
                            Privasi Anda sangat penting bagi kami. Kebijakan Privasi ini menjelaskan jenis informasi yang kami kumpulkan dari Anda atau yang Anda berikan kepada kami ketika Anda mengunjungi situs web {site_settings?.site_name || 'Taaashop'} dan praktik kami dalam mengumpulkan, menggunakan, memelihara, melindungi, dan mengungkapkan informasi tersebut.
                        </p>

                        <h2>1. Informasi yang Kami Kumpulkan</h2>
                        <p>
                            Kami mengumpulkan beberapa jenis informasi dari dan tentang pengguna situs web kami, termasuk informasi:
                        </p>
                        <ul>
                            <li><strong>Identitas Pribadi:</strong> Nama lengkap, nomor telepon (WhatsApp), dan alamat email saat Anda mengisi formulir kontak.</li>
                            <li><strong>Informasi Pesanan:</strong> Detail desain, ukuran, dan preferensi bahan yang Anda diskusikan dengan tim kami via WhatsApp.</li>
                            <li><strong>Data Teknis:</strong> Informasi tentang koneksi internet Anda, peralatan yang Anda gunakan untuk mengakses situs web kami, dan detail penggunaan situs.</li>
                        </ul>

                        <h2>2. Bagaimana Kami Menggunakan Informasi Anda</h2>
                        <p>
                            Kami menggunakan informasi yang kami kumpulkan tentang Anda atau yang Anda berikan kepada kami, termasuk informasi pribadi apa pun:
                        </p>
                        <ul>
                            <li>Untuk menyajikan situs web kami dan isinya kepada Anda.</li>
                            <li>Untuk memberikan informasi, produk, atau layanan yang Anda minta dari kami.</li>
                            <li>Untuk memenuhi kewajiban kami terkait penanganan pesanan dan layanan purna jual.</li>
                            <li>Untuk memberi tahu Anda tentang perubahan pada situs web kami atau produk/layanan yang kami tawarkan.</li>
                        </ul>

                        <h2>3. Berbagi Informasi Anda</h2>
                        <p>
                            <strong>Taaashop tidak pernah menjual, menyewakan, atau memperdagangkan data pribadi Anda kepada pihak ketiga.</strong> Kami dapat mengungkapkan informasi pribadi yang kami kumpulkan atau yang Anda berikan seperti yang dijelaskan dalam kebijakan privasi ini hanya:
                        </p>
                        <ul>
                            <li>Kepada vendor pengiriman (kurir) atau mitra logistik untuk keperluan pengiriman pesanan Anda.</li>
                            <li>Untuk mematuhi perintah pengadilan, hukum, atau proses hukum, termasuk untuk menanggapi permintaan pemerintah atau peraturan.</li>
                            <li>Jika kami yakin pengungkapan diperlukan atau sesuai untuk melindungi hak, properti, atau keamanan Taaashop, pelanggan kami, atau pihak lainnya.</li>
                        </ul>

                        <h2>4. Keamanan Data</h2>
                        <p>
                            Kami telah menerapkan langkah-langkah yang dirancang untuk mengamankan informasi pribadi Anda dari kehilangan yang tidak disengaja dan dari akses, penggunaan, perubahan, dan pengungkapan yang tidak sah. Walaupun kami melakukan upaya terbaik untuk melindungi informasi pribadi Anda, transmisi informasi melalui internet tidak sepenuhnya aman.
                        </p>

                        <h2>5. Hak Anda atas Data Anda</h2>
                        <p>
                            Anda memiliki hak untuk meminta kami memperbaiki data yang tidak akurat, memperbarui informasi yang kedaluwarsa, atau menghapus informasi pribadi Anda dari sistem kami, selama hal tersebut tidak bertentangan dengan kewajiban hukum kami. Anda dapat menghubungi kami melalui WhatsApp atau email untuk mengajukan permohonan ini.
                        </p>

                        <h2>6. Perubahan Kebijakan Privasi</h2>
                        <p>
                            Merupakan kebijakan kami untuk mengunggah setiap perubahan yang kami buat pada kebijakan privasi kami di halaman ini. Jika kami membuat perubahan material terhadap cara kami memperlakukan informasi pribadi pengguna, kami akan memberi tahu Anda melalui pemberitahuan di beranda situs web kami. Tanggal revisi terakhir kebijakan privasi diidentifikasi di bagian bawah halaman.
                        </p>

                        <div className="mt-12 p-6 bg-stone-50 border border-stone-200 rounded-lg">
                            <h3 className="mt-0 text-xl">Punya Pertanyaan tentang Privasi?</h3>
                            <p className="mb-0 text-stone-600 text-base">
                                Jika Anda memiliki pertanyaan atau kekhawatiran tentang kebijakan privasi ini atau praktik privasi kami, silakan hubungi tim kami melalui email di <a href={`mailto:${site_settings?.contact_email || 'hello@taaashop.com'}`}>{site_settings?.contact_email || 'hello@taaashop.com'}</a> atau hubungi nomor WhatsApp resmi kami di <a href={`https://wa.me/${site_settings?.contact_whatsapp?.replace(/\D/g, '') || ''}`} target="_blank" rel="noopener noreferrer">{site_settings?.contact_whatsapp || '+62 812 3456 7890'}</a>.
                            </p>
                        </div>
                        
                        <p className="text-sm text-stone-400 mt-8">
                            <em>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</em>
                        </p>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
