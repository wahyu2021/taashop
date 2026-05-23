import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { FAQData } from '@/types';
import { Button } from '@/Components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Plus, Edit, Trash2, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

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
        <AdminLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Manajemen FAQ</h2>
                    <Button asChild size="sm">
                        <Link href={route('admin.faqs.create')}>
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah FAQ
                        </Link>
                    </Button>
                </div>
            }
        >
            <Head title="Admin - FAQ" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">Urutan</TableHead>
                                        <TableHead>Pertanyaan</TableHead>
                                        <TableHead>Jawaban Singkat</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {faqs.length > 0 ? (
                                        faqs.map((faq) => (
                                            <TableRow key={faq.id}>
                                                <TableCell className="font-medium text-center">
                                                    {/* In actual app we might have order_priority but for simplicity just show ID or index */}
                                                    {faq.id}
                                                </TableCell>
                                                <TableCell className="font-bold">{faq.question}</TableCell>
                                                <TableCell className="max-w-md truncate">{faq.answer}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" size="icon" asChild title="Edit">
                                                            <Link href={route('admin.faqs.edit', faq.id)}>
                                                                <Edit className="w-4 h-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button 
                                                            variant="destructive" 
                                                            size="icon" 
                                                            onClick={() => handleDelete(faq.id)}
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
                                            <TableCell colSpan={4} className="h-24 text-center">
                                                Belum ada data FAQ.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
