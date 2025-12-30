import { defineField, defineType } from 'sanity'

export const feature = defineType({
  name: 'feature',
  title: 'Keunggulan',
  type: 'document',
  fields: [
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
      description: 'Nama icon dari Lucide React, contoh: Gem, Sparkles, Rocket',
      options: {
        list: [
          { title: 'Gem', value: 'Gem' },
          { title: 'Sparkles', value: 'Sparkles' },
          { title: 'Rocket', value: 'Rocket' },
          { title: 'ShieldCheck', value: 'ShieldCheck' },
          { title: 'Users', value: 'Users' },
          { title: 'PackageCheck', value: 'PackageCheck' },
          { title: 'Award', value: 'Award' },
          { title: 'Heart', value: 'Heart' },
          { title: 'Star', value: 'Star' },
          { title: 'Zap', value: 'Zap' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Urutan',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Urutan',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'iconName',
    },
  },
})
