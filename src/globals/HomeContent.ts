import type { GlobalConfig } from 'payload'

export const HomeContent: GlobalConfig = {
  slug: 'home',
  label: 'Главная',
  access: { read: () => true },
  fields: [
    {
      type: 'group',
      name: 'hero',
      label: 'Хиро',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'продуктовый дизайнер 4+ года' },
        { name: 'name', type: 'text', defaultValue: 'дмитрий ли-литвинов' },
        { name: 'intro', type: 'textarea' },
        { name: 'introAccent', type: 'text', label: 'Акцент в интро (жёлтым)' },
        {
          name: 'tickerPhrases',
          type: 'array',
          label: 'Бегущая строка',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
    {
      type: 'group',
      name: 'about',
      label: 'Обо мне',
      fields: [
        { name: 'lead', type: 'textarea' },
        { name: 'accentPhrase', type: 'text', label: 'Акцент (жёлтым)' },
        {
          name: 'stats',
          type: 'array',
          fields: [
            { name: 'num', type: 'text', required: true },
            { name: 'cap', type: 'text', required: true },
          ],
        },
        {
          name: 'approach',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'text', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      name: 'experience',
      type: 'array',
      label: 'Опыт',
      fields: [
        { name: 'company', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'description', type: 'textarea', label: 'Описание (под названием)' },
        { name: 'date', type: 'text' },
      ],
    },
    {
      name: 'stack',
      type: 'array',
      label: 'Стек',
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    {
      type: 'group',
      name: 'support',
      label: 'Поддержка и развитие дизайна',
      fields: [
        { name: 'lead', type: 'textarea' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'description', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'education',
      type: 'array',
      label: 'Образование',
      fields: [
        { name: 'title', type: 'textarea', required: true },
        { name: 'date', type: 'text' },
      ],
    },
    {
      name: 'metadata',
      type: 'array',
      label: 'Метаданные (тогглы)',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
    {
      type: 'group',
      name: 'contactsSection',
      label: 'Секция контактов',
      fields: [
        { name: 'status', type: 'text', defaultValue: 'Открыт к работе и проектам' },
        { name: 'title', type: 'text', defaultValue: 'давай поработаем' },
        { name: 'sub', type: 'text' },
        { name: 'ctaLabel', type: 'text', defaultValue: 'написать в telegram' },
      ],
    },
  ],
}
