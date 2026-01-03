"use client";

import { useState } from "react";
import { Phone, Mail, Copy, Check, MessageCircle, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ContactModalProps {
  type: "phone" | "email";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const contactInfo = {
  phone: {
    value: "+6281234567890",
    display: "+62 812 3456 7890",
    whatsappNumber: "6281234567890", // tanpa + untuk WhatsApp link
    icon: Phone,
    title: "Hubungi via WhatsApp",
    description: "Klik tombol di bawah untuk chat langsung via WhatsApp.",
    actionLabel: "Chat WhatsApp",
    actionIcon: MessageCircle,
  },
  email: {
    value: "info@taashop.com",
    display: "info@taashop.com",
    icon: Mail,
    title: "Kirim Email",
    description: "Klik tombol di bawah untuk mengirim email kepada kami.",
    actionLabel: "Kirim Email",
    actionIcon: Send,
  },
};

export function ContactModal({ type, open, onOpenChange }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const info = contactInfo[type];
  const Icon = info.icon;
  const ActionIcon = info.actionIcon;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(info.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = info.value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAction = () => {
    if (type === "phone") {
      // Redirect to WhatsApp
      const whatsappUrl = `https://wa.me/${contactInfo.phone.whatsappNumber}`;
      window.open(whatsappUrl, "_blank");
    } else {
      // Open mailto
      window.location.href = `mailto:${info.value}`;
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold text-foreground">
            {info.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {info.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Contact Value Display */}
          <div className="flex items-center justify-between rounded-xl border border-orange-200 dark:border-zinc-700 bg-orange-50 dark:bg-zinc-800/50 px-4 py-3">
            <span className="font-medium text-foreground select-all">{info.display}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 gap-1.5 text-orange-600 hover:text-orange-700 hover:bg-orange-100 dark:text-orange-400 dark:hover:bg-zinc-700"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span className="text-xs">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span className="text-xs">Salin</span>
                </>
              )}
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              onClick={handleAction}
              className={`flex-1 gap-2 text-white shadow-lg transition-all ${
                type === "phone"
                  ? "bg-gradient-to-r from-green-500 to-green-600 shadow-green-500/25 hover:from-green-600 hover:to-green-700 hover:shadow-green-500/40"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/40"
              }`}
            >
              <ActionIcon className="h-4 w-4" />
              {info.actionLabel}
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-orange-200 dark:border-zinc-700 hover:bg-orange-50 dark:hover:bg-zinc-800"
            >
              Tutup
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
