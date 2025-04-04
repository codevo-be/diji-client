import { HttpRequestBuilder } from '@digico/utils'

export const HttpService = new HttpRequestBuilder(String(process.env.NEXT_PUBLIC_API_URL) + '/api/task-projects')

export * from './read-columns'

