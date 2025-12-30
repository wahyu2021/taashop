import { defineField, defineType } from 'sanity'

export const orderingStep = defineType({
  name: 'orderingStep',
  title: 'Langkah Pemesanan',
  type: 'document',
  fields: [
    defineField({
      name: 'stepNumber',
      title: 'Nomor Langkah',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Nama Icon (Lucide)',
      type: 'string',
      description: 'Nama icon dari Lucide React',
      options: {
        list: [
          { title: 'ClipboardCheck', value: 'ClipboardCheck' },
          { title: 'Paintbrush', value: 'Paintbrush' },
          { title: 'Package', value: 'Package' },
          { title: 'Send', value: 'Send' },
          { title: 'Truck', value: 'Truck' },
          { title: 'Shirt', value: 'Shirt' },
          { title: 'CheckCircle', value: 'CheckCircle' },
        ],
      },
    }),
  ],
  orderings: [
    {
      title: 'Nomor Langkah',
      name: 'stepAsc',
      by: [{ field: 'stepNumber', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      stepNumber: 'stepNumber',
    },
    prepare({ title, stepNumber }) {
      return {
        title: `${stepNumber}. ${title}`,
      }
    },
  },
})
