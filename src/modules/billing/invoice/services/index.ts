import { HttpRequestBuilder } from '@digico/utils'

export const HttpService = new HttpRequestBuilder(String(process.env.NEXT_PUBLIC_API_URL) + '/api/invoices')

export * from './create-invoice'
export * from './destroy-invoice'
export * from './item/index'
export * from './read-invoice'
export * from './read-invoices'
export * from './update-invoice'
