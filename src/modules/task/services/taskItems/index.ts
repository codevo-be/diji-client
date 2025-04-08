import { HttpRequestBuilder } from '@digico/utils'

export const HttpService = new HttpRequestBuilder(String(process.env.NEXT_PUBLIC_API_URL) + '/api/task-items')

export * from '../taskProjects/read-columns'
export * from './create-item'

