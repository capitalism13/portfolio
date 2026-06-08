import type { GlobalConfig } from 'payload'

export const Contacts: GlobalConfig = {
  slug: 'contacts',
  label: 'Контакты',
  access: { read: () => true },
  admin: { description: 'Единый источник контактов — обновляется на всём сайте.' },
  fields: [
    { name: 'telegram', type: 'text', label: 'Telegram URL', defaultValue: 'https://t.me/capitalism666' },
    { name: 'instagram', type: 'text', label: 'Instagram URL', defaultValue: 'https://www.instagram.com/nocap_itsrealdream/' },
    { name: 'cvUrl', type: 'text', label: 'Ссылка на CV', defaultValue: '/cv' },
    { name: 'email', type: 'text', label: 'Email' },
    { name: 'availabilityStatus', type: 'text', label: 'Статус', defaultValue: 'Открыт к работе и проектам' },
    { name: 'avatarInitials', type: 'text', label: 'Инициалы (аватар)', defaultValue: 'ДЛ' },
  ],
}
