import type { CollectionConfig } from 'payload'
import { lexicalEditor, BlocksFeature } from '@payloadcms/richtext-lexical'
import { caseBlocks } from '../blocks'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'

export const Cases: CollectionConfig = {
  slug: 'cases',
  labels: { singular: 'Кейс', plural: 'Кейсы' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'status', 'updatedAt'],
    livePreview: {
      url: ({ data }) => `${serverURL}/cases/${data?.slug ?? ''}?preview=true`,
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  versions: { drafts: { autosave: { interval: 400 } } },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Карточка',
          fields: [
            { name: 'title', type: 'text', label: 'Название', required: true },
            {
              name: 'slug',
              type: 'text',
              label: 'Slug (URL)',
              required: true,
              unique: true,
              index: true,
              admin: { description: 'Напр. forte-bank → /cases/forte-bank' },
            },
            { name: 'order', type: 'number', label: 'Порядок', defaultValue: 0 },
            { name: 'cover', type: 'upload', relationTo: 'media', label: 'Обложка' },
            { name: 'cardDescription', type: 'textarea', label: 'Описание на карточке' },
            {
              name: 'tags',
              type: 'array',
              label: 'Теги',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'isAccent', type: 'checkbox', label: 'Жёлтый (акцент)', defaultValue: false },
              ],
            },
          ],
        },
        {
          label: 'Детальная',
          fields: [
            { name: 'eyebrow', type: 'text', label: 'Плашка (eyebrow)' },
            { name: 'overview', type: 'textarea', label: 'Вводный текст (overview)' },
            {
              name: 'meta',
              type: 'group',
              label: 'Мета',
              fields: [
                { name: 'role', type: 'text', label: 'Роль' },
                { name: 'date', type: 'text', label: 'Дата' },
                { name: 'tool', type: 'text', label: 'Инструмент' },
                { name: 'readingTime', type: 'text', label: 'Время чтения' },
              ],
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Контент',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  BlocksFeature({ blocks: caseBlocks }),
                ],
              }),
            },
          ],
        },
      ],
    },
  ],
}
