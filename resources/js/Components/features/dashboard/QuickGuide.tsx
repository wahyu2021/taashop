import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Package } from 'lucide-react';

interface QuickGuideProps {
    items?: string[];
}

export default function QuickGuide({ items = ['Tambah Produk Baru', 'Update Harga Paket', 'Balas Pesan Pelanggan'] }: QuickGuideProps) {
    return (
        <Card className="border-none shadow-sm bg-primary text-primary-foreground overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Package className="w-32 h-32 rotate-12" />
            </div>
            <CardHeader>
                <CardTitle className="text-lg font-bold">Bantuan & Panduan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm font-medium leading-relaxed opacity-90">
                    Gunakan menu di samping untuk mengelola katalog produk, bahan, dan pesan dari pelanggan secara efisien.
                </p>
                <ul className="text-xs space-y-2 font-bold opacity-80">
                    {items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-white" />
                            {item}
                        </li>
                    ))}
                </ul>
                <Button className="w-full bg-white text-primary hover:bg-stone-100 font-bold border-none">
                    Buka Dokumentasi
                </Button>
            </CardContent>
        </Card>
    );
}
