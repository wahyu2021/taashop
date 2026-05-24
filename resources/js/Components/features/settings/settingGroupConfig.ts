import { LucideIcon } from 'lucide-react';
import { Settings, Smartphone, Globe, Layout, Fingerprint } from 'lucide-react';

interface GroupConfig {
    icon: LucideIcon;
    label: string;
    description: string;
    tips: string[];
}

/**
 * Centralized configuration for each setting group.
 * Maps group keys (from backend) to their display metadata.
 */
const settingGroupConfig: Record<string, GroupConfig> = {
    hero: {
        icon: Layout,
        label: 'Hero Section',
        description: 'Atur judul, subjudul, dan CTA pada bagian hero di halaman utama website.',
        tips: [
            'Judul Hero sebaiknya singkat dan impactful (maks 8 kata).',
            'Gunakan CTA yang mengundang aksi, contoh: "Pesan Sekarang".',
        ],
    },
    contact: {
        icon: Smartphone,
        label: 'Kontak & Alamat',
        description: 'Informasi kontak yang tampil di footer dan halaman "Hubungi Kami".',
        tips: [
            'Nomor WhatsApp otomatis menjadi link CTA utama.',
            'Gunakan format internasional (62xxx) untuk nomor telepon.',
        ],
    },
    social: {
        icon: Globe,
        label: 'Media Sosial',
        description: 'Link media sosial yang akan ditampilkan di footer website.',
        tips: [
            'Masukkan URL lengkap termasuk https://.',
            'Kosongkan field jika tidak ingin menampilkan platform tersebut.',
        ],
    },
    branding: {
        icon: Fingerprint,
        label: 'Branding & Identitas',
        description: 'Logo dan favicon yang merepresentasikan identitas brand Taaashop.',
        tips: [
            'Gunakan logo format PNG/SVG dengan latar transparan.',
            'Favicon sebaiknya berukuran minimal 512x512px.',
            'Rasio 1:1 (persegi) direkomendasikan untuk kedua file.',
        ],
    },
};

const defaultConfig: GroupConfig = {
    icon: Settings,
    label: 'Lainnya',
    description: 'Konfigurasi pengaturan untuk grup ini.',
    tips: ['Perubahan akan langsung diterapkan setelah disimpan.'],
};

/**
 * Get the display configuration for a setting group.
 * Falls back to a default config if the group key is not recognized.
 */
export function getGroupConfig(group: string): GroupConfig {
    return settingGroupConfig[group] || { ...defaultConfig, label: group.toUpperCase() };
}

export type { GroupConfig };
