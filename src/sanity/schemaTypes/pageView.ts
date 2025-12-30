import { defineType, defineField } from 'sanity'

export const pageView = defineType({
  name: 'pageView',
  title: 'Page View',
  type: 'document',
  fields: [
    defineField({
      name: 'path',
      title: 'Page Path',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sessionId',
      title: 'Session ID',
      type: 'string',
    }),
    defineField({
      name: 'referrer',
      title: 'Referrer',
      type: 'string',
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'path',
      subtitle: 'timestamp',
    },
  },
})
