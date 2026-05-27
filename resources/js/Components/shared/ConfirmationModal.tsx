import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { AlertCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "destructive" | "primary";
    loading?: boolean;
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Apakah Anda yakin?",
    description = "Tindakan ini tidak dapat dibatalkan.",
    confirmText = "Ya, Lanjutkan",
    cancelText = "Batal",
    variant = "destructive",
    loading = false,
}: ConfirmationModalProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent size="sm" className="border-none shadow-2xl">
                <AlertDialogHeader className="sm:place-items-center sm:text-center">
                    <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center mb-2 animate-in zoom-in-50 duration-300",
                        variant === "destructive" 
                            ? "bg-destructive/10 text-destructive" 
                            : "bg-primary/10 text-primary"
                    )}>
                        {variant === "destructive" ? (
                            <Trash2 className="w-6 h-6" />
                        ) : (
                            <AlertCircle className="w-6 h-6" />
                        )}
                    </div>
                    <AlertDialogTitle className="text-xl font-black uppercase tracking-tight text-foreground">
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-stone-500 font-medium">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-center gap-3 mt-4 border-t-0 bg-transparent p-0 -mx-0 -mb-0 rounded-none">
                    <AlertDialogCancel 
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 h-11 border-stone-200 text-stone-600 font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-stone-50 transition-all"
                    >
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm();
                        }}
                        disabled={loading}
                        className={cn(
                            "flex-1 h-11 font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg transition-all active:scale-95",
                            variant === "destructive"
                                ? "bg-destructive hover:bg-destructive/90 text-white shadow-destructive/20"
                                : "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
                        )}
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
