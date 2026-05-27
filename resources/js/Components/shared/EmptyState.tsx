import { LucideIcon, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
    title?: string;
    message?: string;
    icon?: LucideIcon;
    className?: string;
}

export default function EmptyState({
    title = "Konten Sedang Disiapkan",
    message = "Maaf, saat ini belum ada data untuk ditampilkan. Kami akan segera memperbarui bagian ini.",
    icon: Icon = HelpCircle,
    className,
}: EmptyStateProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn(
                "flex flex-col items-center justify-center py-16 px-4 text-center bg-stone-50 rounded-3xl border border-dashed border-stone-200",
                className
            )}
        >
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-6">
                <Icon className="w-8 h-8 text-stone-300" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-stone-900 mb-2">
                {title}
            </h3>
            <p className="text-stone-500 max-w-sm mx-auto text-sm leading-relaxed">
                {message}
            </p>
        </motion.div>
    );
}
