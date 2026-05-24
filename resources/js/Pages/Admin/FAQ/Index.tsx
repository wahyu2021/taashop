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

interface Props {
    faqs: FAQData[];
}

export default function FAQIndex({ faqs }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus FAQ ini?')) {
            router.delete(route('admin.faqs.destroy', id), {
                onSuccess: () => toast.success('FAQ berhasil dihapus'),
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Admin - FAQ" />

            <AdminPageHeader
                title="Manajemen FAQ"
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
                                faqs.map((faq) => (
                                    <TableRow key={faq.id}>
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
                                    </TableRow>
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
        </AdminLayout>
    );
}
