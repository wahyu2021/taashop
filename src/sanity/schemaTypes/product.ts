import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Produk Galeri',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Produk',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Jersey & Sportswear', value: 'Jersey & Sportswear' },
          { title: 'Kemeja & Seragam', value: 'Kemeja & Seragam' },
          { title: 'Kaos & Poloshirt', value: 'Kaos & Poloshirt' },
          { title: 'Jaket & Outerwear', value: 'Jaket & Outerwear' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Gambar Produk',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Tampilkan di Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampil',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
})
