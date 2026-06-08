import type { Block } from 'payload'

/**
 * Кастомные блоки детальной страницы кейса.
 * Каждый блок 1:1 соответствует компоненту/классу из дизайна сайта (cases/case.css),
 * поэтому редактор + Live Preview показывают реальный вид.
 *
 * Обычные заголовки (H2 → .case-h2, H3 → .case-sub), параграфы (.case-text)
 * и списки (.c-list) набираются стандартными средствами Lexical.
 */

export const ProcessStepsBlock: Block = {
  slug: 'processSteps',
  labels: { singular: 'Процесс (шаги)', plural: 'Процесс (шаги)' },
  fields: [
    {
      name: 'steps',
      type: 'array',
      label: 'Шаги',
      minRows: 1,
      fields: [
        { name: 'num', type: 'text', label: 'Номер', defaultValue: '01' },
        { name: 'name', type: 'text', label: 'Название', required: true },
        {
          name: 'bullets',
          type: 'array',
          label: 'Пункты',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
  ],
}

export const BeforeAfterBlock: Block = {
  slug: 'beforeAfter',
  labels: { singular: 'До / После', plural: 'До / После' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'was',
          type: 'array',
          label: 'Было',
          fields: [{ name: 'text', type: 'text', required: true }],
          admin: { width: '50%' },
        },
        {
          name: 'now',
          type: 'array',
          label: 'Стало',
          fields: [{ name: 'text', type: 'text', required: true }],
          admin: { width: '50%' },
        },
      ],
    },
    { name: 'note', type: 'textarea', label: 'Вывод (необязательно)' },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Изображение (необязательно)' },
  ],
}

export const ScreenBlock: Block = {
  slug: 'screen',
  labels: { singular: 'Экран', plural: 'Экраны' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'num', type: 'text', label: 'Номер', admin: { width: '30%' } },
        { name: 'name', type: 'text', label: 'Название', required: true, admin: { width: '70%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'was',
          type: 'array',
          label: 'Было (необязательно)',
          fields: [{ name: 'text', type: 'text', required: true }],
          admin: { width: '50%' },
        },
        {
          name: 'now',
          type: 'array',
          label: 'Стало (необязательно)',
          fields: [{ name: 'text', type: 'text', required: true }],
          admin: { width: '50%' },
        },
      ],
    },
    { name: 'note', type: 'textarea', label: 'Описание' },
    {
      name: 'images',
      type: 'array',
      label: 'Изображения',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
  ],
}

export const MetricsBlock: Block = {
  slug: 'metrics',
  labels: { singular: 'Метрики', plural: 'Метрики' },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Метрики',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'num', type: 'text', label: 'Число', required: true },
        { name: 'cap', type: 'textarea', label: 'Подпись', required: true },
      ],
    },
  ],
}

export const ImageBlock: Block = {
  slug: 'imageBlock',
  labels: { singular: 'Изображение', plural: 'Изображения' },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text', label: 'Подпись (необязательно)' },
    { name: 'fullBleed', type: 'checkbox', label: 'Во всю ширину', defaultValue: false },
  ],
}

export const caseBlocks: Block[] = [
  ProcessStepsBlock,
  BeforeAfterBlock,
  ScreenBlock,
  MetricsBlock,
  ImageBlock,
]
