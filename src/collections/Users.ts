import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Пользователь', plural: 'Пользователи' },
  auth: {
    // Логин по username (admin), без обязательного email
    loginWithUsername: {
      allowEmailLogin: false,
      requireEmail: false,
    },
  },
  admin: { useAsTitle: 'username' },
  fields: [
    { name: 'name', type: 'text', label: 'Имя' },
  ],
}
