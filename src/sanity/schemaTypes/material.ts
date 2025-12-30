import { defineField, defineType } from 'sanity'

export const material = defineType({
  name: 'material',
  title: 'Bahan Material',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Bahan',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Ringkasan',
      type: 'string',
      description: 'Deskripsi singkat 1 baris',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Lengkap',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'features',
      title: 'Fitur/Keunggulan',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'image',
      title: 'Gambar Bahan',
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
      title: 'name',
      subtitle: 'summary',
      media: 'image',
    },
  },
})
