import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { FAQData } from '@/types';
import { Button, buttonVariants } from '@/Components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import AdminPageHeader from '@/Components/shared/AdminPageHeader';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import ConfirmationModal from '@/Components/shared/ConfirmationModal';
import { useState } from 'react';

interface Props {
    faqs: FAQData[];
}

export default function FAQIndex({ faqs }: Props) {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        setDeletingId(id);
        setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (deletingId) {
            router.delete(route('admin.faqs.destroy', deletingId), {
                onSuccess: () => {
                    toast.success('FAQ berhasil dihapus');
                    setIsConfirmOpen(false);
                    setDeletingId(null);
                },
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Manajemen FAQ | Admin Taaashop" />

            <AdminPageHeader 
                title="FAQ"
                description="Kelola pertanyaan yang sering diajukan oleh pelanggan."
                action={
                    <Link 
                        href={route('admin.faqs.create')}
                        className={cn(buttonVariants({ size: 'sm' }), "bg-primary font-black uppercase tracking-widest text-[10px]")}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah FAQ
                    </Link>
                }
            />

            <div className="bg-white overflow-hidden shadow-sm border border-stone-200 sm:rounded-xl p-6 mt-6">
                <div className="rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">ID</TableHead>
                                <TableHead>Pertanyaan</TableHead>
                                <TableHead>Jawaban Singkat</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {faqs.length > 0 ? (
                                faqs.map((faq, index) => (
                                    <motion.tr 
                                        key={faq.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <TableCell className="font-medium">
                                            #{faq.id}
                                        </TableCell>
                                        <TableCell className="font-bold text-stone-900">{faq.question}</TableCell>
                                        <TableCell className="max-w-md truncate text-stone-500">{faq.answer}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link 
                                                    href={route('admin.faqs.edit', faq.id!) as unknown as string}
                                                    className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), "h-8 w-8")}
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <Button 
                                                    variant="destructive" 
                                                    size="icon" 
                                                    className="h-8 w-8"
                                                    onClick={() => handleDelete(faq.id!)}
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
                                    <TableCell colSpan={4} className="h-24 text-center text-stone-400 font-medium italic">
                                        Belum ada data FAQ.
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
                title="Hapus FAQ?"
                description="FAQ yang dihapus tidak dapat dikembalikan. Apakah Anda yakin?"
            />
        </AdminLayout>
    );
}
