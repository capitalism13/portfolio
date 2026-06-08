import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Cases } from './collections/Cases'
import { Contacts } from './globals/Contacts'
import { HomeContent } from './globals/HomeContent'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const postgresURL = process.env.POSTGRES_URL || process.env.DATABASE_URL
const databaseURI = process.env.DATABASE_URI || 'file:./portfolio.db'
const usePostgres = Boolean(postgresURL) || databaseURI.startsWith('postgres')

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: '— CMS · Дмитрий Ли-Литвинов' },
  },
  collections: [Users, Media, Cases],
  globals: [Contacts, HomeContent],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: usePostgres
    ? postgresAdapter({ pool: { connectionString: postgresURL || databaseURI } })
    : sqliteAdapter({ client: { url: databaseURI } }),
  sharp,
  plugins: [
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
})
