import { HttpRequestBuilder } from '@digico/utils'

export const HttpService = new HttpRequestBuilder(String(process.env.NEXT_PUBLIC_API_URL) + '/api/tasks')

export * from './create-task-column'
export * from './destroy-supplier'
export * from './read-supplier'
export * from './read-task-column'
export * from './read-task-item'
export * from './update-supplier'
