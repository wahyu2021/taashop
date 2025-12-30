import { defineField, defineType } from 'sanity'

export const adminUser = defineType({
  name: 'adminUser',
  title: 'Admin User',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'passwordHash',
      title: 'Password Hash',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'failedAttempts',
      title: 'Failed Login Attempts',
      type: 'number',
      hidden: true,
      initialValue: 0,
    }),
    defineField({
      name: 'lockedUntil',
      title: 'Locked Until',
      type: 'datetime',
      hidden: true,
    }),
    defineField({
      name: 'lastLogin',
      title: 'Last Login',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'email',
    },
  },
})
