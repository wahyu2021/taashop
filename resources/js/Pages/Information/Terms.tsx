import PublicLayout from '@/Layouts/PublicLayout';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Terms() {
    const { site_settings } = usePage<PageProps>().props;

    return (
        <PublicLayout>
            <Head title="Syarat dan Ketentuan | Taaashop" />

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
                            Syarat & <span className="text-orange-600">Ketentuan</span>
                        </h1>
                        <p className="text-stone-400 text-lg">
                            Panduan dan aturan main dalam melakukan pemesanan sablon dan jersey di Taaashop untuk memastikan kepuasan kedua belah pihak.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto prose prose-stone prose-lg lg:prose-xl prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-a:text-orange-600 hover:prose-a:text-orange-700">
                        <p className="lead">
                            Selamat datang di {site_settings?.site_name || 'Taaashop'}. Syarat dan ketentuan berikut menguraikan aturan dan peraturan penggunaan layanan kami, baik melalui website maupun pemesanan via WhatsApp.
                        </p>

                        <h2>1. Ketentuan Pemesanan</h2>
                        <ul>
                            <li>Pemesanan dianggap sah dan masuk antrean produksi hanya setelah konsumen melakukan pembayaran <strong>Down Payment (DP) minimal 50%</strong> dari total tagihan.</li>
                            <li>Minimum Order Quantity (MOQ) berlaku untuk beberapa produk tertentu. Silakan hubungi admin untuk detail lebih lanjut.</li>
                            <li>Waktu pengerjaan (estimasi) dihitung mulai H+1 setelah DP diterima dan desain (jika ada) telah disetujui (ACC) oleh pelanggan.</li>
                        </ul>

                        <h2>2. Ketentuan Desain</h2>
                        <ul>
                            <li>Desain yang akan dicetak/disablon harus dikirimkan dalam resolusi tinggi (disarankan format vector seperti .ai, .cdr, atau .pdf) untuk hasil yang maksimal.</li>
                            <li>Jika pelanggan tidak memiliki desain, tim kami dapat membantu dengan biaya tambahan desain (tergantung tingkat kesulitan).</li>
                            <li>Pelanggan bertanggung jawab penuh atas hak cipta (copyright) dari desain yang diberikan kepada kami untuk diproduksi. Taaashop dibebaskan dari segala tuntutan hukum apabila terjadi pelanggaran hak cipta.</li>
                        </ul>

                        <h2>3. Perubahan & Pembatalan</h2>
                        <ul>
                            <li>Perubahan detail pesanan (seperti ukuran, jumlah, atau desain) hanya dapat dilakukan <strong>maksimal 1x24 jam</strong> setelah DP dibayarkan.</li>
                            <li>Apabila proses produksi sudah berjalan, pesanan <strong>tidak dapat dibatalkan atau diubah</strong>.</li>
                            <li>Jika pelanggan membatalkan pesanan sepihak setelah DP dibayarkan dan belum masuk tahap produksi, DP akan dikembalikan dengan potongan biaya administrasi atau biaya desain (jika desain dibuat oleh kami).</li>
                        </ul>

                        <h2>4. Kualitas & Toleransi</h2>
                        <ul>
                            <li>Taaashop selalu berusaha memberikan hasil terbaik sesuai dengan standar spesifikasi bahan dan tinta yang telah disepakati.</li>
                            <li>Terdapat toleransi perbedaan warna antara layar monitor/HP dengan hasil cetak fisik sekitar 10-15%. Hal ini wajar dalam industri percetakan.</li>
                            <li>Terdapat toleransi ukuran pakaian (size chart) kurang lebih 1-2 cm dari ukuran standar yang tertera.</li>
                        </ul>

                        <h2>5. Pengambilan & Pengiriman Barang</h2>
                        <ul>
                            <li>Barang hanya dapat diambil atau dikirim setelah pelunasan (sisa tagihan) dilakukan.</li>
                            <li>Biaya pengiriman (ongkir) sepenuhnya ditanggung oleh pihak pembeli, kecuali ada kesepakatan atau promo khusus sebelumnya.</li>
                            <li>Taaashop tidak bertanggung jawab atas keterlambatan, kerusakan, atau kehilangan barang yang disebabkan oleh pihak ketiga (jasa ekspedisi). Namun, kami akan membantu memproses klaim kepada pihak ekspedisi jika diperlukan.</li>
                        </ul>

                        <h2>6. Komplain & Retur</h2>
                        <ul>
                            <li>Komplain mengenai cacat produksi, kesalahan sablon, atau ketidaksesuaian ukuran yang signifikan hanya dilayani maksimal <strong>3x24 jam</strong> setelah barang diterima oleh pelanggan.</li>
                            <li>Pelanggan wajib menyertakan bukti berupa video *unboxing* dan foto detail cacat yang dikeluhkan.</li>
                            <li>Barang yang akan diretur belum boleh dicuci atau dipakai.</li>
                        </ul>

                        <div className="mt-12 p-6 bg-stone-50 border border-stone-200 rounded-lg">
                            <h3 className="mt-0 text-xl">Konsultasi Lebih Lanjut?</h3>
                            <p className="mb-0 text-stone-600 text-base">
                                Jika ada poin dalam syarat dan ketentuan ini yang kurang jelas, silakan diskusikan langsung dengan tim layanan pelanggan kami melalui WhatsApp di <a href={`https://wa.me/${site_settings?.contact_whatsapp?.replace(/\D/g, '') || ''}`} target="_blank" rel="noopener noreferrer">{site_settings?.contact_whatsapp || '+62 812 3456 7890'}</a>.
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
