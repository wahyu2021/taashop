<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // Contact Group
            [
                'key' => 'whatsapp_number',
                'value' => '628123456789',
                'label' => 'Nomor WhatsApp (Global)',
                'type' => 'text',
                'group' => 'contact',
                'order_priority' => 1,
            ],
            [
                'key' => 'office_address',
                'value' => 'Jl. Merdeka No. 123, Jakarta, Indonesia',
                'label' => 'Alamat Kantor',
                'type' => 'textarea',
                'group' => 'contact',
                'order_priority' => 2,
            ],
            [
                'key' => 'contact_email',
                'value' => 'admin@taaashop.com',
                'label' => 'Email Kontak',
                'type' => 'text',
                'group' => 'contact',
                'order_priority' => 3,
            ],

            // Branding Group
            [
                'key' => 'site_logo',
                'value' => null,
                'label' => 'Logo Website',
                'type' => 'image',
                'group' => 'branding',
                'order_priority' => 1,
            ],
            [
                'key' => 'site_favicon',
                'value' => null,
                'label' => 'Favicon',
                'type' => 'image',
                'group' => 'branding',
                'order_priority' => 2,
            ],

            // Social Media Group
            [
                'key' => 'instagram_url',
                'value' => 'https://instagram.com/taaashop',
                'label' => 'Instagram URL',
                'type' => 'url',
                'group' => 'social',
                'order_priority' => 1,
            ],
            [
                'key' => 'facebook_url',
                'value' => 'https://facebook.com/taaashop',
                'label' => 'Facebook URL',
                'type' => 'url',
                'group' => 'social',
                'order_priority' => 2,
            ],
            [
                'key' => 'tiktok_url',
                'value' => 'https://tiktok.com/@taaashop',
                'label' => 'TikTok URL',
                'type' => 'url',
                'group' => 'social',
                'order_priority' => 3,
            ],

            // Hero Section Group
            [
                'key' => 'hero_title',
                'value' => 'Custom Sablon & Jersey Premium',
                'label' => 'Hero Title',
                'type' => 'text',
                'group' => 'hero',
                'order_priority' => 1,
            ],
            [
                'key' => 'hero_subtitle',
                'value' => 'Wujudkan desain impianmu dengan kualitas cetak terbaik dan bahan premium yang nyaman dipakai.',
                'label' => 'Hero Subtitle',
                'type' => 'textarea',
                'group' => 'hero',
                'order_priority' => 2,
            ],
            [
                'key' => 'hero_cta_text',
                'value' => 'Lihat Katalog',
                'label' => 'Hero CTA Text',
                'type' => 'text',
                'group' => 'hero',
                'order_priority' => 3,
            ],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
