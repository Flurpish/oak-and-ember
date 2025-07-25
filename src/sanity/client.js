import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '4sdmis4b',         // ./cms/sanity.config.ts
  dataset: 'production',
  apiVersion: '2023-07-07',      // Current date/version
  useCdn: true,                  // Use CDN for faster public queries
})

export default client
