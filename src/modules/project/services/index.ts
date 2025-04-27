import { HttpRequestBuilder } from '@digico/utils'

export const HttpService = new HttpRequestBuilder(String(process.env.NEXT_PUBLIC_API_URL) + '/api/projects')

export * from './create-project'
export * from './destroy-project'
export * from './read-project'
export * from './read-projects'
export * from './update-project'
