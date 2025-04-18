import { MeiliSearch } from 'meilisearch'

export const client = new MeiliSearch({
  host: import.meta.env.VITE_MEILI_HOST,
  apiKey: import.meta.env.VITE_MEILI_SEARCH_KEY
})