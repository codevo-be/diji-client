import { HttpRequestBuilder } from '@digico/utils'

export const HttpService = new HttpRequestBuilder(String(process.env.NEXT_PUBLIC_API_URL) + '/api/credit-notes')

export * from './create-credit-note'
export * from './destroy-credit-note'
export * from './item/index'
export * from './read-credit-note'
export * from './read-credit-notes'
export * from './update-credit-note'
