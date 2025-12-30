import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Pengaturan Website',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Judul Hero',
      type: 'string',
      initialValue: 'Kualitas Terbaik, Harga Terjangkau',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Subjudul Hero',
      type: 'text',
      rows: 2,
      initialValue: 'TaaShop adalah partner konveksi Anda untuk mewujudkan pakaian custom berkualitas tinggi.',
    }),
    defineField({
      name: 'phone',
      title: 'Nomor Telepon',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'Nomor WhatsApp',
      type: 'string',
      description: 'Format: 6282281954629 (tanpa +)',
    }),
    defineField({
      name: 'instagram',
      title: 'Username Instagram',
      type: 'string',
      description: 'Tanpa @',
    }),
    defineField({
      name: 'address',
      title: 'Alamat',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'googleMapsEmbed',
      title: 'Google Maps Embed URL',
      type: 'url',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Pengaturan Website',
      }
    },
  },
})
