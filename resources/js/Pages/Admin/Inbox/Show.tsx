import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    ChevronLeft, 
    Mail, 
    Phone, 
    MessageSquare, 
    Calendar,
    Globe,
    CheckCircle2,
    Clock,
    Trash2,
    Send,
    ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { ContactSubmissionData } from '@/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Props {
    submission: ContactSubmissionData;
    statuses: { name: string, value: string }[];
}

export default function Show({ submission, statuses }: Props) {
    const { data, setData, put, processing } = useForm({
        status: submission.status,
    });

    const handleStatusChange = (newStatus: string) => {
        setData('status', newStatus as any);
        // We use router.put directly for immediate update if preferred, 
        // but here we let the user click a button or just handle it via select.
    };

    const submitStatus = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.inbox.update', submission.id));
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'new': return 'bg-blue-100 text-blue-600';
            case 'contacted': return 'bg-orange-100 text-orange-600';
            case 'closed': return 'bg-stone-100 text-stone-500';
            default: return 'bg-stone-100 text-stone-500';
        }
    };

    // Helper for WA link
    const waLink = `https://wa.me/${submission.phone?.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(submission.name)}%2C%20saya%20Admin%20Taashop...`;

    return (
        <AdminLayout>
            <Head title={`Pesan dari ${submission.name}`} />

            {/* Header Section */}
            <div className="mb-8">
                <Link 
                    href={route('admin.inbox.index')}
                    className="flex items-center text-xs font-bold text-stone-400 uppercase tracking-widest hover:text-primary transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Kembali ke Inbox
                </Link>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
                    <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                        Detail Pesan
                    </h1>
                    <div className="flex items-center gap-3">
                        <Badge 
                            className={`text-xs font-black uppercase tracking-widest px-3 py-1 border-none ${getStatusColor(submission.status)}`}
                        >
                            {submission.status}
                        </Badge>
                        <form onSubmit={submitStatus} className="flex items-center gap-2">
                            <select 
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value as any)}
                                className="h-9 rounded-md border border-stone-200 bg-white px-3 text-xs font-bold uppercase tracking-wider focus:ring-primary/20"
                            >
                                {statuses.map(s => (
                                    <option key={s.value} value={s.value}>{s.name}</option>
                                ))}
                            </select>
                            <Button size="sm" disabled={processing} className="bg-stone-900 hover:bg-stone-800 font-bold h-9">
                                Update
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                {/* Message Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-sm overflow-hidden">
                        <CardHeader className="bg-stone-50 border-b border-stone-100">
                            <CardTitle className="text-lg font-bold flex items-center gap-2 text-stone-700">
                                <MessageSquare className="w-5 h-5 text-primary" />
                                Isi Pesan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-foreground">{submission.subject || '(Tanpa Subjek)'}</h2>
                                <div className="flex items-center gap-4 mt-2 text-xs text-stone-400 font-bold uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {format(new Date(submission.submitted_at), 'dd MMMM yyyy HH:mm', { locale: id })}</span>
                                    {submission.source_page && <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> via {submission.source_page}</span>}
                                </div>
                            </div>
                            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-100 italic text-stone-600 leading-relaxed whitespace-pre-wrap">
                                "{submission.message}"
                            </div>

                            <div className="mt-10 pt-8 border-t border-stone-100 flex flex-wrap gap-4">
                                {submission.phone && (
                                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-bold h-12 px-6 shadow-lg shadow-green-200">
                                        <a href={waLink} target="_blank" rel="noopener noreferrer">
                                            <Send className="w-5 h-5 mr-2" />
                                            Balas via WhatsApp
                                        </a>
                                    </Button>
                                )}
                                {submission.email && (
                                    <Button variant="outline" asChild className="border-stone-200 text-stone-600 font-bold h-12 px-6">
                                        <a href={`mailto:${submission.email}`}>
                                            <Mail className="w-5 h-5 mr-2" />
                                            Balas via Email
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm overflow-hidden">
                        <CardHeader className="bg-stone-50 border-b border-stone-100">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 text-stone-600 uppercase tracking-widest">
                                Informasi Pengirim
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl font-black">
                                    {submission.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-extrabold text-foreground leading-tight">{submission.name}</p>
                                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">Calon Pelanggan</p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-stone-100">
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Email Address</Label>
                                    <p className="text-sm font-bold text-stone-700">{submission.email || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Phone Number</Label>
                                    <p className="text-sm font-bold text-stone-700">{submission.phone || '-'}</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-stone-100">
                                <Button 
                                    variant="ghost" 
                                    className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 font-bold text-xs uppercase tracking-widest"
                                    onClick={() => {
                                        if(confirm('Hapus pesan ini secara permanen?')) {
                                            router.delete(route('admin.inbox.destroy', submission.id));
                                        }
                                    }}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Hapus Pesan
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Response Tip */}
                    <Card className="border-none shadow-sm bg-primary text-primary-foreground">
                        <CardContent className="p-6 flex gap-4">
                            <Clock className="w-6 h-6 shrink-0 opacity-50" />
                            <div>
                                <p className="text-sm font-bold">Fast Response!</p>
                                <p className="text-xs opacity-80 mt-1 leading-relaxed">Pesan yang dibalas dalam &lt; 1 jam meningkatkan peluang closing hingga 70%.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
