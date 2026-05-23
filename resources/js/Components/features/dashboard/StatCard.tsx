import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { ArrowUpRight, LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    color: string;
    bg: string;
    border: string;
}

export default function StatCard({ title, value, icon: Icon, color, bg, border }: StatCardProps) {
    return (
        <Card className={`border ${border} shadow-sm hover:shadow-md transition-all duration-300 group`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-stone-600 uppercase tracking-wider">
                    {title}
                </CardTitle>
                <div className={`p-2.5 rounded-xl ${bg} group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline gap-2">
                    <div className="text-3xl font-black text-foreground">{value}</div>
                    <span className="text-xs font-bold text-stone-400">Unit</span>
                </div>
                <div className="mt-4 flex items-center text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                    <span>Data Realtime</span>
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                </div>
            </CardContent>
        </Card>
    );
}
