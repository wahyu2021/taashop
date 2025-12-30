import { defineField, defineType } from 'sanity'

export const productPackage = defineType({
  name: 'productPackage',
  title: 'Paket Produk',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Paket',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productType',
      title: 'Jenis Produk',
      type: 'string',
      options: {
        list: [
          { title: 'Jersey Bola', value: 'Jersey Bola' },
          { title: 'T-Shirt', value: 'T-Shirt' },
          { title: 'Poloshirt', value: 'Poloshirt' },
          { title: 'Jersey Basketball', value: 'Jersey Basketball' },
          { title: 'Shooting Shirt', value: 'Shooting Shirt' },
          { title: 'Seragam Tactical', value: 'Seragam Tactical' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'includes',
      title: 'Termasuk',
      type: 'string',
      description: 'Contoh: Baju Saja, Baju dan Celana',
    }),
    defineField({
      name: 'printType',
      title: 'Jenis Cetak',
      type: 'string',
      options: {
        list: [
          { title: 'Sablon', value: 'Sablon' },
          { title: 'Printing', value: 'Printing' },
          { title: 'Sablon & Printing', value: 'Sablon & Printing' },
        ],
      },
    }),
    defineField({
      name: 'minPrice',
      title: 'Harga Minimum',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'maxPrice',
      title: 'Harga Maksimum',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'image',
      title: 'Gambar Paket',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      subtitle: 'productType',
      media: 'image',
    },
  },
})
