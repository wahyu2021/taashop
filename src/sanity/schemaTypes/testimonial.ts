import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimoni',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Kutipan/Testimoni',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Nama Pelanggan',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Jabatan/Keterangan',
      type: 'string',
      description: "Contoh: Owner Kedai Kopi 'Kopi Kita'",
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
      subtitle: 'role',
    },
  },
})
