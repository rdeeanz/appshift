import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'username',
      },
      fields: [
        { name: 'username', type: 'text', required: true },
        { 
          name: 'role', 
          type: 'select', 
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
            { label: 'User', value: 'user' },
          ],
          defaultValue: 'user',
          required: true,
        },
      ],
    },
    {
      slug: 'apps',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'license', type: 'text' },
        { name: 'type', type: 'text' },
        { name: 'platforms', type: 'text' },
        { name: 'features', type: 'text' },
        { name: 'origin', type: 'text' },
        { name: 'category', type: 'relationship', relationTo: 'categories' },
        { name: 'isFeatured', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      slug: 'categories',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'icon', type: 'text' },
      ],
    },
    {
      slug: 'media',
      upload: true,
      fields: [
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
    {
      slug: 'posts',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true, unique: true },
        { name: 'author', type: 'text', required: true },
        { name: 'date', type: 'date', required: true },
        { name: 'category', type: 'text', required: true },
        { name: 'heroImage', type: 'relationship', relationTo: 'media' },
        { name: 'excerpt', type: 'textarea' },
        { name: 'content', type: 'textarea', required: true },
      ],
    },
  ],
  globals: [
    {
      slug: 'hero',
      fields: [
        { name: 'badgeText', type: 'text' },
        { name: 'heading', type: 'text' },
        { name: 'subheading', type: 'textarea' },
      ],
    },
    {
      slug: 'stats',
      fields: [
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'value', type: 'text' },
            { name: 'label', type: 'text' },
          ],
        },
      ],
    },
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
})
