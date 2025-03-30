import { HttpRequestBuilder } from '@digico/utils'

export const HttpService = new HttpRequestBuilder(String(process.env.NEXT_PUBLIC_API_URL) + '/api/recurring-invoices')

export * from './create-recurring-invoice'
export * from './destroy-recurring-invoice'
export * from './item/index'
export * from './read-recurring-invoice'
export * from './read-recurring-invoices'
export * from './update-recurring-invoice'
