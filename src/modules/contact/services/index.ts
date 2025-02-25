import { HttpRequestBuilder } from '@digico/utils'

export const HttpService = new HttpRequestBuilder(String(process.env.NEXT_PUBLIC_API_URL) + '/api/contacts')

export * from './create-contact'
export * from './destroy-contact'
export * from './read-contact'
export * from './read-contacts'
export * from './update-contact'
