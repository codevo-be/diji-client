import { HttpRequestBuilder } from '@digico/utils'

export const HttpService = new HttpRequestBuilder(String(process.env.NEXT_PUBLIC_API_URL) + '/api/self-invoices')

export * from './create-self-invoice'
export * from './destroy-self-invoice'
export * from './read-self-invoice'
export * from './read-self-invoices'
export * from './update-self-invoice'
