import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { TestimonialData } from '@/types';
import { Button, buttonVariants } from '@/Components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';
import AdminPageHeader from '@/Components/shared/AdminPageHeader';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import ConfirmationModal from '@/Components/shared/ConfirmationModal';
import { useState } from 'react';

interface Props {
    testimonials: TestimonialData[];
}

export default function TestimonialIndex({ testimonials }: Props) {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        setDeletingId(id);
        setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (deletingId) {
            router.delete(route('admin.testimonials.destroy', deletingId), {
                onSuccess: () => {
                    toast.success('Testimoni berhasil dihapus');
                    setIsConfirmOpen(false);
                    setDeletingId(null);
                },
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Testimoni | Admin Taaashop" />

            <AdminPageHeader
                title="Manajemen Testimoni"
                description="Kelola ulasan dan pengalaman pelanggan Anda."
                action={
                    <Link 
                        href={route('admin.testimonials.create')}
                        className={cn(buttonVariants({ size: 'sm' }), "bg-primary font-black uppercase tracking-widest text-[10px]")}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Testimoni
                    </Link>
                }
            />

            <div className="bg-white overflow-hidden shadow-sm border border-stone-200 sm:rounded-xl p-6 mt-6">
                <div className="rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-20">Avatar</TableHead>
                                <TableHead>Nama Pelanggan</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Bukti</TableHead>
                                <TableHead>Konten</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {testimonials.length > 0 ? (
                                testimonials.map((item, index) => (
                                    <motion.tr 
                                        key={item.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <TableCell>
                                            <div className="w-10 h-10 rounded-full bg-stone-100 overflow-hidden border border-stone-200">
                                                <img 
                                                    src={item.avatar_url || '/images/placeholder.svg'} 
                                                    alt={item.customer_name} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-bold text-stone-900">{item.customer_name}</div>
                                            <div className="text-xs text-stone-500">{item.customer_title || '-'}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 text-orange-500">
                                                <Star size={14} className="fill-orange-500" />
                                                <span className="font-bold">{item.rating}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {item.proof_url ? (
                                                <div className="w-12 h-8 rounded border border-stone-200 overflow-hidden bg-stone-50">
                                                    <img src={item.proof_url} alt="Proof" className="w-full h-full object-cover" />
                                                </div>
                                            ) : (
                                                <span className="text-[10px] text-stone-300 font-bold uppercase tracking-widest">No Proof</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate text-stone-500 italic">
                                            "{item.content}"
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link 
                                                    href={route('admin.testimonials.edit', item.id!) as unknown as string}
                                                    className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), "h-8 w-8")}
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <Button 
                                                    variant="destructive" 
                                                    size="icon" 
                                                    className="h-8 w-8"
                                                    onClick={() => handleDelete(item.id!)}
                                                    title="Hapus"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </motion.tr>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-stone-400 font-medium italic">
                                        Belum ada data testimoni.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <ConfirmationModal 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Hapus Testimoni?"
                description="Testimoni yang dihapus tidak dapat dikembalikan. Apakah Anda yakin?"
            />
        </AdminLayout>
    );
}
